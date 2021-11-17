/* eslint-disable prettier/prettier */
import bcrypt from 'bcrypt';

import { CreateEmployeeDto, UpdateEmployeeDto, UpdateEmployeePermissionDto, CreateMultipleEmployeeDto } from '@dtos/employee/employee.dto';
import { HttpException } from '@exceptions/HttpException';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import DesignationModel from '@models/employee/designation.model';
import departmentModel from '@/models/department/department.model';
import shiftTypeModel from '@models/shift/shift_type.model';
import projectModel from '@/models/project/project.model';
import { ObjectId } from "mongodb";
import moment from "moment";
import { IProject } from './../interfaces/project-interface/project.interface';
import { Designation } from './../interfaces/employee-interface/designation.interface';
import { IDepartment } from './../interfaces/employee-interface/department.interface';
import { isEmpty } from '@utils/util';
import { IShiftType } from '@/interfaces/shift-interface/shift_type.interface';

class EmployeeService {
  // eslint-disable-next-line prettier/prettier
  public Employees = EmployeeModel;
  public Department = departmentModel;
  public Designation = DesignationModel;
  public Project = projectModel;
  public Shift = shiftTypeModel;

  public async findAllEmployee(): Promise<Employee[]> {
    const Employees: Employee[] = await this.Employees.find().populate('default_shift designation department branch projectId reports_to');
    return Employees;
  }

  public async findEmployeeById(EmployeeId: string): Promise<Employee> {
    if (isEmpty(EmployeeId)) throw new HttpException(400, "You're not EmployeeId");

    const findEmployee: Employee = await this.Employees.findOne({ _id: EmployeeId }).populate("default_shift department designation branch projectId reports_to");
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

    let dateOfJoining = moment(EmployeeData['date_of_joining']).add(1, 'M')
    let endOfyear = moment().endOf('year')
    let duration = Math.abs(moment(dateOfJoining).diff(endOfyear, 'months', true)).toFixed(0)
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
      isAdmin: e.isAdmin === 'true' ? true : false,
      department: this.notEmpty(e.department) ? AllOffices[e.department.toLowerCase()] : null,
      designation: this.notEmpty(e.designation) ? AllDesignations[e.designation.toLowerCase()] : null,
      projectId: this.notEmpty(e.projectId) ? AllOffices[e.projectId.toLowerCase()] : null,
      default_shift: this.notEmpty(e.default_shift) ? AllShifts[e.default_shift.toLowerCase()] : null,
      reports_to: null,
      branch: null,
      ogid: this.notEmpty(e.ogid) ? e.ogid : this.generateOGID(),
    }));
    console.log(formatted);

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

    const updateEmployeeById: Employee = await this.Employees.findByIdAndUpdate(EmployeeId, { EmployeeData });
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
}

export default EmployeeService;
