/* eslint-disable prettier/prettier */
import bcrypt from 'bcrypt';

import { CreateEmployeeDto, UpdateEmployeeDto, UpdateEmployeePermissionDto } from '@dtos/employee/employee.dto';
import { HttpException } from '@exceptions/HttpException';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import { isEmpty } from '@utils/util';

class EmployeeService {
  // eslint-disable-next-line prettier/prettier
  public Employees = EmployeeModel;

  public async findAllEmployee(): Promise<Employee[]> {
    const Employees: Employee[] = await this.Employees.find().populate('default_shift designation department branch projectId');
    return Employees;
  }

  public async findEmployeeById(EmployeeId: string): Promise<Employee> {
    if (isEmpty(EmployeeId)) throw new HttpException(400, "You're not EmployeeId");

    const findEmployee: Employee = await this.Employees.findOne({ _id: EmployeeId }).populate("default_shift department designation branch projectId");
    if (!findEmployee) throw new HttpException(409, "You're not Employee");

    return findEmployee;
  }

  public async createEmployee(EmployeeData: CreateEmployeeDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.company_email });
    if (findEmployee) throw new HttpException(409, `Your email ${EmployeeData.company_email} already exists`);
    const randomstring = Math.random().toString(36).slice(2);
    const hashedPassword = await bcrypt.hash(randomstring, 10);
    const newOgid = this.generateOGID();
    if(!EmployeeData.department){
      EmployeeData.department = null;
    }

    const createEmployeeData: Employee = await this.Employees.create({ ...EmployeeData, password: hashedPassword, ogid: newOgid });

    return createEmployeeData;
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
    if (isEmpty(EmployeeData)) throw new HttpException(400, "Input all required field");

    if (EmployeeData.company_email) {
      const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.company_email });
      if (findEmployee && findEmployee._id != EmployeeId) throw new HttpException(409, `email not matched`);
    }

    const updateEmployeeById: Employee = await this.Employees.findOneAndUpdate
    ({_id: EmployeeId}, { $set: { permissionLevel: EmployeeData.permissionLevel } }, {new : true});

    if (!updateEmployeeById) throw new HttpException(409, "You're not Employee");

    return updateEmployeeById;
  }

  public async deleteEmployee(EmployeeId: string): Promise<Employee> {
    const deleteEmployeeById: Employee = await this.Employees.findByIdAndDelete(EmployeeId);
    if (!deleteEmployeeById) throw new HttpException(409, "You're not Employee");

    return deleteEmployeeById;
  }
  private generateOGID(){
    return "OG"+ Math.floor(1000 + Math.random() * 9000)
  }
}

export default EmployeeService;
