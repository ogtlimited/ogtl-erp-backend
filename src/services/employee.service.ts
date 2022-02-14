/* eslint-disable prettier/prettier */
import bcrypt from 'bcrypt';

import { CreateEmployeeDto, UpdateEmployeeDto, UpdateEmployeePermissionDto, UpdateEmployeeRoleDto, CreateMultipleEmployeeDto } from '@dtos/employee/employee.dto';
import { HttpException } from '@exceptions/HttpException';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import DesignationModel from '@models/employee/designation.model';
import departmentModel from '@/models/department/department.model';
import shiftTypeModel from '@models/shift/shift_type.model';
import projectModel from '@/models/project/project.model';
import EmployeeStatModel from '@/models/employee-stat/employee-stat.model';
import { ObjectId } from "mongodb";
import moment from "moment";
import { IProject } from './../interfaces/project-interface/project.interface';
import { Designation } from './../interfaces/employee-interface/designation.interface';
import { IDepartment } from './../interfaces/employee-interface/department.interface';
import { isEmpty } from '@utils/util';
import { IShiftType } from '@/interfaces/shift-interface/shift_type.interface';
import TerminationService from './employee-lifecycle/termination.service';
import { IEmployeeStat } from './../interfaces/employee-stat/employee-stat.interface';

class EmployeeService {
  // eslint-disable-next-line prettier/prettier
  public Employees = EmployeeModel;
  public Department = departmentModel;
  public Designation = DesignationModel;
  public Project = projectModel;
  public Shift = shiftTypeModel;
  public employeeStatModel = EmployeeStatModel;
  public TerminationService = new TerminationService();


  public async findAllEmployee(): Promise<Employee[]> {
    const Employees: Employee[] = await this.Employees.find().populate('default_shift designation department branch projectId reports_to role');
    return Employees;
  }

  public async findAllEmployeeByMonth(): Promise<Employee[]> {
    const d = new Date()
    const month: number = d.getMonth() + 1
    const year = d.getFullYear() 
    const Employees: Employee[] = await this.Employees.find({
      date_of_joining: {
          $gte: moment(`${year}/${month}`, 'YYYY/MM').startOf('month').format('x'),
          $lte: moment(`${year}/${month}`, 'YYYY/MM').endOf('month').format('x')
      }
  }).populate('default_shift designation department branch ');
    return Employees;
  }

  public async EmployeeRatio() {
    const monthlyEmployeeCount = (await this.findAllEmployeeByMonth()).length
    const monthlyTermination = (await this.TerminationService.findAllTerminationsByMonth()).length
    const totalEmployeeCount = (await this.Employees.find()).length
    const ration = (Math.abs(monthlyEmployeeCount - monthlyTermination)) / totalEmployeeCount
    const payload = {
      total_employee_count: monthlyEmployeeCount,
      total_termination_count: monthlyTermination,
      ratio: ration
    }
    return await EmployeeStatModel.create(payload)
    
  }

  public async findEmployeeRatio(): Promise<IEmployeeStat[]> {
    const d = new Date()
    const month: number = d.getMonth() + 1
    const year = d.getFullYear() 
    const Employees: IEmployeeStat[] = await this.employeeStatModel.find({
      createdAt: {
          $gte: moment(`${year}/1}`, 'YYYY/MM').startOf('month').format('x'),
          $lte: moment(`${year}/${month}`, 'YYYY/MM').endOf('month').format('x')
      }
    });
    return Employees;
    
  }

  public async findEmployeeById(EmployeeId: string): Promise<Employee> {
    if (isEmpty(EmployeeId)) throw new HttpException(400, "You're not EmployeeId");

    const findEmployee: Employee = await this.Employees.findOne({ _id: EmployeeId }).populate("default_shift department designation branch projectId reports_to role");
    if (!findEmployee) throw new HttpException(409, "You're not Employee");

    return findEmployee;
  }

  public async createEmployee(EmployeeData: CreateEmployeeDto): Promise<any> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    // const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.company_email });
    // if (findEmployee) throw new HttpException(409, `Your email ${EmployeeData.company_email} already exists`);
    const randomstring = Math.random().toString(36).slice(2);
    const hashedPassword = await bcrypt.hash(randomstring, 10);
    const newOgid = this.generateOGID();
    if (!EmployeeData.department) {
      EmployeeData.department = null;
    }

    const dateOfJoining = moment(EmployeeData['date_of_joining']).add(1, 'M')
    const endOfyear = moment().endOf('year')
    const duration = Math.abs(moment(dateOfJoining).diff(endOfyear, 'months', true)).toFixed(0)
    EmployeeData.leaveCount = Number(duration) * 2;
    // console.log(dateOfJoining, endOfyear, duration)
    // console.log(endOfyear)
    console.log(EmployeeData['leaveCount'])
    const createEmployeeData: Employee = await this.Employees.create({ ...EmployeeData, password: hashedPassword, ogid: newOgid });
    return createEmployeeData;
  }
  public async createMultipleEmployee(EmployeeData: any): Promise<any> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    // const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.company_email });
    // if (findEmployee) throw new HttpException(409, `Your email ${EmployeeData.company_email} already exists`);
    console.log(EmployeeData);
    const randomstring = Math.random().toString(36).slice(2);
    const hashedPassword = await bcrypt.hash(randomstring, 10);
    const newOgid = this.generateOGID();
    // if(!EmployeeData.department){
    //   EmployeeData.department = null;
    // }

    // const shift: IShiftType = await this.Shift.findOne({ shift_name: { $regex : new RegExp(EmployeeData.default_shift, "i") } });
    const AllOffices = {};
    const AllDesignations = {};
    const AllShifts = {};
    const dept = await this.Department.find();
    const project = await this.Project.find();
    const designations = await this.Designation.find();
    const shift = await this.Shift.find();
    // console.log(shift)
    // console.log(designations)
    dept.forEach(e => {
      AllOffices[e.department.toString().toLowerCase()] = e._id;
    });
    project.forEach(e => {
      AllOffices[e.project_name.toString().toLowerCase()] = e._id;
    });
    designations.forEach(e => {
      AllDesignations[e.designation.toString().toLowerCase()] = e._id;
    });
    shift.forEach(e => {
      AllShifts[e.shift_name.toString().toLowerCase()] = e._id;
    });
    // console.log('ALL Offices', AllOffices, AllDesignations, AllShifts)
    // console.log('ALL Offices', AllOffices)
    const formatted = EmployeeData.map((e: any) => ({
      ...e,
      status: "active",
      isAdmin: e.isAdmin === 'true' ? true : false,
      isTeamLead: e.isTeamLead === 'true' ? true : false,
      isSupervisor: e.isSupervisor === 'true' ? true : false,
      leaveCount: 0,
      department: this.notEmpty(e.department) ? AllOffices[e.department.toLowerCase()] : null,
      designation: this.notEmpty(e.designation) ? AllDesignations[e.designation.toLowerCase()] : null,
      projectId: this.notEmpty(e.projectId) ? AllOffices[e.projectId.toLowerCase()] : null,
      company_email: this.notEmpty(e.company_email) ? e.company_email : this.genEmail(e.first_name, e.last_name),
      default_shift: this.notEmpty(e.default_shift) ? AllShifts[e.default_shift.toLowerCase()] : null,
      reports_to: null,
      branch: null,
      gender: e.gender.toLowerCase(),
      ogid: this.notEmpty(e.ogid) ? e.ogid : this.generateOGID(),
    }));
    console.log(formatted);
    console.log('formatted');

    const createEmployeeData = await this.Employees.insertMany(formatted);

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
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    if (EmployeeData.company_email) {
      const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.company_email });
      if (findEmployee && findEmployee._id != EmployeeId) throw new HttpException(409, `You're email ${EmployeeData.company_email} already exists`);
    }

    if (EmployeeData.password) {
      const hashedPassword = await bcrypt.hash(EmployeeData.password, 10);
      EmployeeData = { ...EmployeeData, password: hashedPassword };
    }
    // console.log(emp)
    const updateEmployeeById: Employee = await this.Employees.findByIdAndUpdate(EmployeeId,  EmployeeData );
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
      { $set: 
        { role: EmployeeData.role,
          sievedApplicationCount: findEmployee.sievedApplicationCount ? findEmployee.sievedApplicationCount : 0,
          isRepSiever: EmployeeData.isRepSiever,
        }
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
  private generateOGID() {
    return 'OG' + Math.floor(1000 + Math.random() * 9000);
  }
  private notEmpty(str: string) {
    return str.length > 0 ? true : false;
  }

  public async teamLeads() {
    const teamLeadData: any = await this.Employees.find({ isTeamLead: true }, {
      company_email: 1,
      status: 1,
      projectId: 1,
      ogid:1,
      first_name:1,
      last_name:1,})
      .populate({
        path: 'projectId',
        select:{
          project_name:1
        }
      });
    const teamLeadMembersData = []
    for(let idx = 0; idx < teamLeadData.length; idx++){
      const tl = teamLeadData[idx].toObject()
      const teamMemberData: any = await this.teamMembers(tl._id)
      tl.teamMembers = teamMemberData
      teamLeadMembersData.push(tl)
    }
    return teamLeadMembersData;
  }
  public async teamMembers(teamLeadID) {
    console.log(teamLeadID);
    const teamLead:any = await this.Employees.findOne({_id: teamLeadID}, {_id: 1, first_name:1, last_name:1, company_email:1, ogid:1})
    if (!teamLead){
      throw  new HttpException(404, "lead does not exist")
    }
    console.log(teamLead);
    console.log(teamLead['_id']);
    return await this.Employees.find({reports_to: teamLeadID}, {_id: 1, first_name:1, last_name:1, company_email:1, ogid:1})

  }
  genEmail(first_name: string, last_name: string){
    return first_name.toLowerCase() + '.' + last_name.toLowerCase() + '@outsourceglobal.com'
  }
}

export default EmployeeService;
