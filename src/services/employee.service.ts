/* eslint-disable prettier/prettier */
import bcrypt from 'bcrypt';

import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  UpdateEmployeePermissionDto,
  UpdateEmployeeRoleDto,
  CreateMultipleEmployeeDto,
} from '@dtos/employee/employee.dto';
import { HttpException } from '@exceptions/HttpException';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import EmployeeShiftService from '@services/shift/employee_shift.service';
import DesignationModel from '@models/employee/designation.model';
import departmentModel from '@/models/department/department.model';
import shiftTypeModel from '@models/shift/shift_type.model';
import projectModel from '@/models/project/project.model';
import EmployeeStatModel from '@/models/employee-stat/employee-stat.model';
import moment from 'moment';
import { IProject } from './../interfaces/project-interface/project.interface';
import { Designation } from './../interfaces/employee-interface/designation.interface';
import { IDepartment } from './../interfaces/employee-interface/department.interface';
import { isEmpty } from '@utils/util';
import { IShiftType } from '@/interfaces/shift-interface/shift_type.interface';
import TerminationService from './employee-lifecycle/termination.service';
import { IEmployeeStat } from './../interfaces/employee-stat/employee-stat.interface';
import IdRequestService from './procurement/idrequest.service';
import EmployeesMailingService from '@/services/employee/employee_mailing.service';
import EmployeeFiltrationService from '@/services/employee_filtration.service';
import { IEmployeeShift } from '@/interfaces/shift-interface/employee_shift.interface';
import { userInfo } from 'os';
const mongoose = require('mongoose')

class EmployeeService {
  // eslint-disable-next-line prettier/prettier
  private MAX_LIMIT:number = 50;
  public Employees = EmployeeModel;
  public employeeShiftService = new EmployeeShiftService();
  public Department = departmentModel;
  public Designation = DesignationModel;
  public Project = projectModel;
  public Shift = shiftTypeModel;
  public employeeStatModel = EmployeeStatModel;
  public TerminationService = new TerminationService();
  private idRequestService = new IdRequestService();
  private employeesMailingService = new EmployeesMailingService();
  private employeeFiltrationService = new EmployeeFiltrationService();
  public async findAllEmployee(): Promise<Employee[]> {
    const Employees: Employee[] = await this.Employees.find().populate('default_shift designation department branch projectId reports_to role');
    return Employees;
  }
  public async EmployeeCount(): Promise<any> {
    const count: number = await this.Employees.find({status: "active"}).count();
    return count;
  }

  public async findAllEmployeeByMonth(): Promise<Employee[]> {
    const d = new Date();
    const month: number = d.getMonth() + 1;
    const year = d.getFullYear();
    const Employees: Employee[] = await this.Employees.find({
      date_of_joining: {
        $gte: moment(`${year}/${month}`, 'YYYY/MM').startOf('month').format('x'),
        $lte: moment(`${year}/${month}`, 'YYYY/MM').endOf('month').format('x'),
      },
    }).populate('default_shift designation department branch ');
    return Employees;
  }

  public async EmployeeRatio() {
    const monthlyEmployeeCount = (await this.findAllEmployeeByMonth()).length;
    const monthlyTermination = (await this.TerminationService.findAllTerminationsByMonth()).length;
    const totalEmployeeCount = (await this.Employees.find()).length;
    const ration = Math.abs(monthlyEmployeeCount - monthlyTermination) / totalEmployeeCount;
    const payload = {
      total_employee_count: monthlyEmployeeCount,
      total_termination_count: monthlyTermination,
      ratio: ration,
    };
    return await EmployeeStatModel.create(payload);
  }

  public async findEmployeeRatio(): Promise<IEmployeeStat[]> {
    const d = new Date();
    const month: number = d.getMonth() + 1;
    const year = d.getFullYear();
    const Employees: IEmployeeStat[] = await this.employeeStatModel.find({
      createdAt: {
        $gte: moment(`${year}/1}`, 'YYYY/MM').startOf('month').format('x'),
        $lte: moment(`${year}/${month}`, 'YYYY/MM').endOf('month').format('x'),
      },
    });
    return Employees;
  }

  public async findEmployeeById(EmployeeId: string): Promise<Employee> {
    if (isEmpty(EmployeeId)) throw new HttpException(400, "You're not EmployeeId");

    const findEmployee = await this.Employees.findOne({ _id: EmployeeId }).populate(
      'default_shift department designation branch projectId reports_to role',
    );
    if (!findEmployee) throw new HttpException(409, "You're not Employee");

    return findEmployee;
  }

  public async findEmployeeLeaveCountByOgId(ogid: string): Promise<Employee> {
    if (isEmpty(ogid)) throw new HttpException(400, "OGID is empty");
    const findEmployee = await this.Employees.findOne({ ogid }).select({ "leaveCount": 1, "_id":0});
    if (!findEmployee) throw new HttpException(404, "Employee Not Found");
    return findEmployee;
  }
  public async updateEmployeeLeaveCountByOgId(ogid: string, reqBody): Promise<Employee> {
    if (isEmpty(ogid)) throw new HttpException(400, "OGID is empty");
    const findEmployee = await this.Employees.findOneAndUpdate({ ogid },{
      $set:{
        leaveCount: reqBody.leaveCount
      }
    });
    return findEmployee;
  }

  public async createEmployee(EmployeeData: CreateEmployeeDto): Promise<any> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");
    const randomstring = Math.random().toString(36).slice(2);
    const hashedPassword = await bcrypt.hash(randomstring, 10);
    const newOgid = await this.automateOGIDGeneration(EmployeeData.isAdmin);
    if (!EmployeeData.department) EmployeeData.department = null;
    if (!EmployeeData.projectId) EmployeeData.projectId = null;
    const department = await this.Department.findById(EmployeeData?.department)
    const campaign = await this.Project.findById(EmployeeData?.projectId)
    if (department?.department == "IT" 
      || department?.department == "Software Development" 
      || department?.department === "Facility"
      || campaign?.project_name === "Legal"){
        EmployeeData.strictAttendance = false
      }
    const dateOfJoining = moment(EmployeeData['date_of_joining']).add(1, 'M');
    const endOfyear = moment().endOf('year');
    const duration = Math.abs(moment(dateOfJoining).diff(endOfyear, 'months', true)).toFixed(0);
    EmployeeData.leaveCount = Number(duration) * 2;
    console.log(EmployeeData['leaveCount']);
    const employee: Employee = await this.Employees.findOne({company_email: EmployeeData.company_email})
    if (employee) throw new HttpException(409, 'Employee already exist');
    const createEmployeeData: Employee = await this.Employees.create({ ...EmployeeData, password: hashedPassword, ogid: newOgid });
    const idRequestData = {
      employee_id: createEmployeeData._id,
      date: createEmployeeData.createdAt,
      notes: 'None',
    };
    this.idRequestService.createIdRequest(idRequestData).then(result => {
      console.log('id Request Created');
    });
    await this.createEmployeeShiftHelperMethod(EmployeeData, createEmployeeData.ogid)
    // Promise.all([this.employeesMailingService.sendIntroductoryMail(createEmployeeData.first_name, createEmployeeData.ogid, createEmployeeData.company_email)])
    return createEmployeeData;
  }
  public async createMultipleEmployee(EmployeeData: any): Promise<any> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const formatted = EmployeeData.map((e: any) => ({
      ...e,
      status: 'active',
      first_name: e.first_name,
      middle_name: e.middle_name,
      last_name: e.last_name,
      isAdmin: e.isAdmin === 'true' ? true : false,
      leaveCount: 0,
      department: this.notEmpty(e.department) ? e?.department : null,
      designation: this.notEmpty(e.designation) ? e?.designation : null,
      projectId: null,
      company_email: e.company_email,
      reports_to: null,
      branch: null,
      gender: e.gender.toLowerCase(),
      employeeType: e.employeeType,
      date_of_joining: new Date()
    }));
    const employeesRecord = [];
    for (let idx = 0; idx < formatted.length; idx++) {
      const record = formatted[idx]
      record.ogid = await this.automateOGIDGeneration(record.isAdmin, idx)
      const employeeInfo = await this.Employees.findOne({ company_email: record.company_email })
      if (!employeeInfo) {
        employeesRecord.push(record)
      }
    }
    const createEmployeeData = await this.Employees.insertMany(employeesRecord);
    return createEmployeeData;
  }
  public async getDepartment(dept) {
    const data: IDepartment = await this.Department.findOne({ department: { $regex: new RegExp(dept, 'i') } });
    console.log(data);
    return data?._id;
  }
  public async getDesignation(designation) {
    const data: Designation = await this.Designation.findOne({ designation: { $regex: new RegExp(designation, 'i') } });
    return data?._id;
  }
  public async getProject(project) {
    const data: IProject = await this.Project.findOne({ project_name: { $regex: new RegExp(project, 'i') } });
    return data?._id;
  }
  public async getShift(shift) {
    const data: IShiftType = await this.Shift.findOne({ shift_name: { $regex: new RegExp(shift, 'i') } });
    return data?._id;
  }

  public async updateEmployee(EmployeeId: string, EmployeeData: UpdateEmployeeDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, 'EmployeeData is absent');
    EmployeeData.ogid = EmployeeData.ogid.replace(/ /g, '')
    if (EmployeeData.company_email) {
      const findEmployee: Employee = await this.Employees.findOne({ company_email: EmployeeData.company_email });
      if (findEmployee && findEmployee._id != EmployeeId) throw new HttpException(409, `You're email ${EmployeeData.company_email} already exists`);
    }

    // if (EmployeeData.password) {
    //   const hashedPassword = await bcrypt.hash(EmployeeData.password, 10);
    //   EmployeeData = { ...EmployeeData, password: hashedPassword };
    // }
    // console.log(emp)
    const department = await this.Department.findById(EmployeeData?.department)
    const campaign = await this.Project.findById(EmployeeData?.projectId)
    if (department?.department == "IT"
      || department?.department == "Software Development"
      || department?.department == "Facility"
      || campaign?.project_name == "Legal") {
      EmployeeData.strictAttendance = false
    }
    const updateEmployeeById: Employee = await this.Employees.findByIdAndUpdate({_id: EmployeeId}, EmployeeData);
    if (!updateEmployeeById) throw new HttpException(409, "You're not Employee");

    return updateEmployeeById;
  }

  public async updateEmployeePermission(EmployeeId: string, EmployeeData: UpdateEmployeePermissionDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, 'Input all required field');

    if (EmployeeData.company_email) {
      const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.company_email });
      if (findEmployee && findEmployee._id != EmployeeId) throw new HttpException(409, `email not matched`);
    }

    const updateEmployeeById: Employee = await this.Employees.findOneAndUpdate(
      { _id: EmployeeId },
      { $set: { permissionLevel: EmployeeData.permissionLevel } },
      { new: true },
    );

    if (!updateEmployeeById) throw new HttpException(409, "You're not Employee");

    return updateEmployeeById;
  }
  public async updateEmployeeRole(EmployeeId: string, EmployeeData: UpdateEmployeeRoleDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, 'Input all required field');

    if (EmployeeData._id) {
      const findEmployee: Employee = await this.Employees.findOne({ _id: EmployeeData._id });
      if (findEmployee && findEmployee._id != EmployeeId) throw new HttpException(409, `User not Found`);

      console.log(EmployeeData, 'ÉMPLOYEE');

      const updateEmployeeById: Employee = await this.Employees.findOneAndUpdate(
        { _id: EmployeeId },
        {
          $set: {
            role: EmployeeData.role,
            sievedApplicationCount: findEmployee.sievedApplicationCount ? findEmployee.sievedApplicationCount : 0,
            isRepSiever: EmployeeData.isRepSiever,
          },
        },
        { new: true },
      );

      if (!updateEmployeeById) throw new HttpException(409, "You're not Employee");

      return updateEmployeeById;
    }
  }

  public async deleteEmployee(EmployeeId: string): Promise<Employee> {
    const deleteEmployeeById: Employee = await this.Employees.findByIdAndDelete(EmployeeId);
    if (!deleteEmployeeById) throw new HttpException(409, "You're not Employee");

    return deleteEmployeeById;
  }
  public async getAllEmployeesAndPaginate(query): Promise<Employee[]> {
    let matchBy = {}
    const employees = this.employeeFiltrationService.getAllEmployeesHelperMethod(matchBy, query, this.Employees)
    return employees;
  }
  private generateOGID() {
    return 'OG' + Math.floor(1000 + Math.random() * 9000);
  }
  private async automateOGIDGeneration(isAdmin: Boolean, bulk_upload_increment: number = 0): Promise<any>{
    if (isAdmin){
      const lastEmployeeInAdmin = await this.Employees.findOne({ isAdmin: true })
        .sort({ _id: -1 })
        .limit(1)
      const lastEmployeeInAdminEmploymentNumber = lastEmployeeInAdmin.ogid.slice(2)
      let employeeEmploymentNumber = Number(lastEmployeeInAdminEmploymentNumber) + bulk_upload_increment + 1
      const ogid = 'OG' + employeeEmploymentNumber
      return ogid.toString().replace(/ /g, '');
    }
    else {
      const lastNonAdminEmployee = await this.Employees.findOne({ isAdmin: false })
        .sort({ _id: -1 })
        .limit(1)
      const currentWeek = moment().week()
      const lastNonAdminEmployeeEmploymentWeek = moment(lastNonAdminEmployee.createdAt).week()
      const lastNonAdminEmployeeEmploymentNumber = lastNonAdminEmployee.ogid.slice(4, -2)
      let employeeEmploymentNumber = Number(lastNonAdminEmployeeEmploymentNumber) + bulk_upload_increment + 1
      if (currentWeek === lastNonAdminEmployeeEmploymentWeek) {
        employeeEmploymentNumber = employeeEmploymentNumber
      }
      else {
        employeeEmploymentNumber = 1
      }
      const formattedEmployeeEmploymentNumber = employeeEmploymentNumber < 10 ? "0" + Number(employeeEmploymentNumber) : Number(employeeEmploymentNumber)
      const currentYear = moment().format("YY")
      const ogid = 'OG' + currentYear + formattedEmployeeEmploymentNumber + currentWeek
      return ogid.toString().replace(/ /g, '');
    }
   
  
  }
  private notEmpty(str: string) {
    return str.length > 0 ? true : false;
  }

  public async teamLeads() {
    const teamLeadData: any = await this.Employees.find(
      { isTeamLead: true },
      {
        company_email: 1,
        status: 1,
        projectId: 1,
        ogid: 1,
        first_name: 1,
        last_name: 1,
      },
    ).populate({
      path: 'projectId',
      select: {
        project_name: 1,
      },
    });
    const teamLeadMembersData = [];
    for (let idx = 0; idx < teamLeadData.length; idx++) {
      const tl = teamLeadData[idx].toObject();
      const teamMemberData: any = await this.teamMembers(tl._id);
      tl.teamMembers = teamMemberData;
      teamLeadMembersData.push(tl);
    }
    return teamLeadMembersData;
  }
  public async teamMembers(teamLeadID) {
    console.log(teamLeadID);
    const teamLead: any = await this.Employees.findOne({ _id: teamLeadID }, { _id: 1, first_name: 1, last_name: 1, company_email: 1, ogid: 1 });
    if (!teamLead) {
      throw new HttpException(404, 'lead does not exist');
    }
    console.log(teamLead);
    console.log(teamLead['_id']);
    return await this.Employees.find({ reports_to: teamLeadID }, { _id: 1, first_name: 1, last_name: 1, company_email: 1, ogid: 1 });
  }
  genEmail(first_name: string, last_name: string) {
    return first_name.toLowerCase() + '.' + last_name.toLowerCase() + '@outsourceglobal.com';
  }

  public async getEmployeesHeadCount(): Promise<any>{
    const headCount: any = await this.Employees.aggregate([
        {
          '$group': {
            '_id': '$status', 
            'total': {
              '$count': {}
            }
          }
        }
    ]);
    return {headCount}
  }

  public async getGenderCount(): Promise<any>{
    const genderCount: any = await this.Employees.aggregate([
        {
            '$match':{
              'status': 'active'
            }
        },
        {
          '$group': {
            '_id': '$gender', 
            'total': {
              '$count': {}
            }
          }
        }
    ])
    return {genderCount}
  }

  public async getEmployeesByGender(gender: string, searchQuery: any): Promise<any>{
    const matchBy = {status:"active", gender:gender}
    const employeesByGender: any = await this.getEmployeesByGenderHelperMethod(matchBy, searchQuery)
    return { employeesByGender } 
}

private async getEmployeesByGenderHelperMethod(matchBy,searchQuery:any): Promise<any> {
    const page = parseInt(searchQuery?.page) || 1;
    let limit: number;
    if(!searchQuery.limit){
      limit = 10
    }
    else if(parseInt(searchQuery?.limit)>this.MAX_LIMIT){
      limit = this.MAX_LIMIT
    }
    else if(parseInt(searchQuery?.limit)){
      limit = parseInt(searchQuery.limit)
    }
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const filtrationQuery = this.filtrationQuerymethod(matchBy, searchQuery, startIndex, limit)
    const employeesByGender: Employee[] = await this.Employees
    .aggregate(filtrationQuery)
    
    const removeLimitAndSkip:any = filtrationQuery.filter(item => !item["$limit"] && !item["$skip"])
    removeLimitAndSkip.push({$count:"Number of Docs"})
    const countDocuments:any = await this.Employees.aggregate(removeLimitAndSkip)
    let totalPage:number;
    for(let count of countDocuments){
       totalPage = count["Number of Docs"]
    }
    const pagination: any = {numberOfPages:Math.ceil(totalPage/limit)};
    if(endIndex < totalPage){
      pagination.next = {
        page: page + 1,
        limit: limit
      }
    }
    if(startIndex > 0){
      pagination.previous = {
        page: page - 1,
        limit: limit
      }
    }
    return { 
      employeesByGender: employeesByGender,
      pagination: pagination,
      totalEmployees: employeesByGender.length
    }
  }
  

  public async getGenderCountByDepartment(department_id: string): Promise<any>{
    if(department_id === "not_specified"){
      const matchBy = {status: "active", department: null}
       return(
        this.getGenderCountByDepartmentHelperMethod(matchBy)
      )
    }
        
     let matchBy = {status: "active", department: mongoose.Types.ObjectId(department_id)}
      return(
        this.getGenderCountByDepartmentHelperMethod(matchBy)
      )
  }

  public async getGenderDiversityRatio(): Promise<any>{
      const getAllGender = await Promise.all([this.getGenderCount()])
      const numberOfMales = getAllGender.map<any>(value => {
        return value.genderCount.find(gender => gender._id==="male")
      })[0].total
      const numberOfFemales = getAllGender.map<any>(value => {
        return value.genderCount.find(gender => gender._id==="female")
      })[0].total
      const totalGenderCount = numberOfMales + numberOfFemales
      return {genderRatio:` ${Math.round((numberOfFemales/totalGenderCount)*100)}% \- ${Math.round((numberOfMales/totalGenderCount)*100)}%`}
  }

  public async countEmployeesByDepartment(): Promise<any>{
      const employeesByDepartment: any = await this.Employees.aggregate([
          {
            '$match':{
              'status': 'active'
            }
          },
          {
            $lookup:{
              from: "departments",
              localField: "department",
              foreignField: "_id",
              as: "department"
              }
          },
          {
            $unwind: {path :"$department",
            preserveNullAndEmptyArrays: true
          }
          }, 
          {
              '$group': {
                '_id': '$department', 
                'total': {
                  '$count': {}
                }
              }
            }       
    ]);
    return {employeesByDepartment}
  }
   public async getDesignationsByDepartment(department_id: string): Promise<any>{
    if(department_id === "not_specified"){
      const matchBy =  {
          status: 'active',
          department: null,
          designation: { $ne: null } 
        }
       return(
        this.getDesignationsByDepartmentHelperMethod(matchBy)
      )
    }
        
     let matchBy = {
      status: "active", 
      department: mongoose.Types.ObjectId(department_id),
      designation: { $ne: null } 
    }
      return(
        this.getDesignationsByDepartmentHelperMethod(matchBy)
      )
  }
  public async getDesignationsGender(gender: string): Promise<any>{
      const matchBy =  {
          status: 'active',
          gender: gender,
        }
       return(
        this.getDesignationsByGenderHelperMethod(matchBy)
      )
  }
  public async getEmployeesByDepartment(searchQuery:any, department_id: string): Promise<any>{
    if(department_id === "not_specified"){
      const matchBy = {status: "active", department: null}
       return(
        this.getEmployeesByDepartmentHelperMethod(matchBy, searchQuery)
      )
    }
        let matchBy = {status: "active", department: mongoose.Types.ObjectId(department_id)}

      return(
        this.getEmployeesByDepartmentHelperMethod(matchBy, searchQuery)
      )
   }
  public async getReporteesForLeads(query: any, userId: string): Promise<Employee[]> {
    let matchBy = {
      reports_to: mongoose.Types.ObjectId(userId)
    }
    const employees  = await this.employeeFiltrationService.getAllEmployeesHelperMethod(matchBy, query, this.Employees)
    return employees;
  }
  public async getAllLeads(query: any): Promise<Employee[]> {
    let matchBy = {
      isLeadership: true
    }
    const employees  = await this.employeeFiltrationService.getAllEmployeesHelperMethod(matchBy, query, this.Employees)
    return employees;
  }
  private async getEmployeesByDepartmentHelperMethod(matchBy,searchQuery:any): Promise<any> {
    const page = parseInt(searchQuery?.page) || 1;
    let limit: number;
    if(!searchQuery.limit){
      limit = 10
    }
    else if(parseInt(searchQuery?.limit)>this.MAX_LIMIT){
      limit = this.MAX_LIMIT
    }
    else if(parseInt(searchQuery?.limit)){
      limit = parseInt(searchQuery.limit)
    }

    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const filtrationQuery = this.filtrationQuerymethod(matchBy, searchQuery, startIndex, limit)
    const employeesByDepartment: Employee[] = await this.Employees
    .aggregate(filtrationQuery)
    
    const removeLimitAndSkip:any = filtrationQuery.filter(item => !item["$limit"] && !item["$skip"])
    removeLimitAndSkip.push({$count:"Number of Docs"})
    const countDocuments:any = await this.Employees.aggregate(removeLimitAndSkip)
    let totalPage:number;
    for(let count of countDocuments){
       totalPage = count["Number of Docs"]
    }
    const pagination: any = {numberOfPages:Math.ceil(totalPage/limit)};
    if(endIndex < totalPage){
      pagination.next = {
        page: page + 1,
        limit: limit
      }
    }
    if(startIndex > 0){
      pagination.previous = {
        page: page - 1,
        limit: limit
      }
    }
    return { 
      employeesByDepartment: employeesByDepartment,
      pagination: pagination,
      totalEmployees: employeesByDepartment.length
    }
  }
  
  private filtrationQuerymethod(matchBy, searchQuery, startIndex:number, limit:number){ 
    const filtrationQuery:any = [
      {
        $match: matchBy
      },
      {
       $lookup:{
         from: "departments",
         localField: "department",
         foreignField: "_id",
         as: "department"
      }
      },
      {
       $unwind: {path :"$department",
       preserveNullAndEmptyArrays: true
      }
      },
      {
       $lookup:{
         from: "designations",
         localField: "designation",
         foreignField: "_id",
         as: "designation"
         }
       },
      {
       $unwind: {path :"$designation",
       preserveNullAndEmptyArrays: true
     }
     }
     ]
     if(searchQuery.search){
      filtrationQuery.push(
        {
          $match:{
            $or : [
              { first_name:{$regex:searchQuery.search, $options:"i"}},
              { last_name:{$regex:searchQuery.search, $options:"i"}},
              { middle_name:{$regex:searchQuery.search, $options:"i"}},
              { "designation.designation":{$regex:searchQuery.search, $options:"i"}}
            ]
          }
        }
      )
      }
      if(searchQuery.designation){
      filtrationQuery.push(
        {
          $match: { "designation.designation":{$regex:searchQuery.designation, $options:"i"}}    
         }
      )
      }
    
      if(searchQuery?.page){
        filtrationQuery.push(
          { $skip: startIndex },
          )
        }
      if(searchQuery?.limit){
        filtrationQuery.push(
          { $limit: limit},
          )
        }
      return filtrationQuery
  }

  private async getGenderCountByDepartmentHelperMethod(matchBy: any): Promise<any>{
    const genderCountByDepartment = await this.Employees.aggregate([
    {
        '$match': matchBy

    },
    {
        '$group': {
          '_id': '$gender', 
          'total': {
            '$count': {}
          }
        }
    }
    ])
    return {genderCountByDepartment}
  }

  private async getDesignationsByDepartmentHelperMethod(matchBy: any): Promise<any>{
    const designationsByDepartment: any = await this.Employees.aggregate([
        {
          '$match': matchBy
        },
        {
          $lookup:{
            from: "designations",
            localField: "designation",
            foreignField: "_id",
            as: "designation"
            }
        },
        {
          $unwind: {path :"$designation",
          preserveNullAndEmptyArrays: true
        }
        },
        {
          '$group': {
            '_id': '$designation', 
            
          }
        }  
  ]);
  return {designationsByDepartment}
}

private async getDesignationsByGenderHelperMethod(matchBy: any): Promise<any>{
  const designationsByGender: any = await this.Employees.aggregate([
      {
        '$match': matchBy
      },
      {
        $lookup:{
          from: "designations",
          localField: "designation",
          foreignField: "_id",
          as: "designation"
          }
      },
      {
        $unwind: {path :"$designation",
        preserveNullAndEmptyArrays: true
      }
      },
      {
        '$group': {
          '_id': '$designation', 
          
        }
      }  
]);
return {designationsByGender}
}
  private async createEmployeeShiftHelperMethod(EmployeeData, ogid): Promise<any>{ 
    EmployeeData.shifts.map(data => {
      data.ogid = ogid
      return data
    })
    try{
      for (let i = 0; i < EmployeeData.shifts.length; i++) {
        EmployeeData.shifts[i].departmentID = EmployeeData?.department ? EmployeeData.department : null
        EmployeeData.shifts[i].campaignID = EmployeeData?.projectId ? EmployeeData.projectId : null
        await this.employeeShiftService.createNewEmployeeShift(EmployeeData.shifts[i])
      } 
      await this.employeeShiftService.addOrUpdateEmployeeShiftTimeToExternalDatabase(EmployeeData.shifts)
    }
    catch(error){
      console.log(error)
    }
}

}

export default EmployeeService;
