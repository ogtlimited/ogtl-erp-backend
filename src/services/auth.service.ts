import { generateOGID } from './../utils/util';
/* eslint-disable prettier/prettier */
import config from 'config';
import jwt from 'jsonwebtoken';
import EmployeeModel from '@models/employee/employee.model';
import { CreateEmployeeDto, EmployeeLoginDto } from '@dtos/employee/employee.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import bcrypt from 'bcrypt';
import { Employee } from '@interfaces/employee-interface/employee.interface';

import { isEmpty } from '@utils/util';

class AuthService {
  private Employees = EmployeeModel;
  public async signup(EmployeeData: CreateEmployeeDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const findEmployee: Employee = await this.Employees.findOne({ company_email: EmployeeData.company_email });

    if (findEmployee) throw new HttpException(409, `You're email ${EmployeeData.company_email} already exists`);

    const hashedPassword = await bcrypt.hash(EmployeeData.password, 10);

    const createEmployeeData: Employee = await this.Employees.create({ ...EmployeeData, password: hashedPassword });
    return createEmployeeData;
  }

  public async login(EmployeeData: EmployeeLoginDto): Promise<{ token: any; employee: Employee }> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");
    console.log('LOGIN ATTEMPT', EmployeeData);
    const employee: Employee =  await this.Employees.findOne({ company_email: EmployeeData.company_email }).populate('department designation default_shift projectId role');
    console.log('AUTH SERVICE', employee)
    
    if (!employee) throw new HttpException(409, `This email ${EmployeeData.company_email} does not exist`);
    console.log('AUTH SERVICE',employee)
    const newEmployee = {
      companyEmail: EmployeeData.company_email,
      date_of_joining: new Date(),
      ogid: generateOGID(),
      employeeType: "FullTime",
      first_name: EmployeeData.first_name,
      last_name: EmployeeData.last_name,
      status: "active",
    }
    // const isPasswordMatching: boolean = await bcrypt.compare(EmployeeData.password, employee.password);

    // if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
    if(employee.status === 'terminated') throw new HttpException(409, "Your employment has been terminated");
    const tokenData = this.createToken(employee);
    // const cookie = this.createCookie(tokenData);
    return { token: tokenData, employee };
  }

  public async logout(EmployeeData: EmployeeLoginDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.company_email });

    if (!findEmployee) throw new HttpException(409, `Ogid ${EmployeeData.company_email} not found`);

    return findEmployee;
  }
  public createToken(Employee: Employee): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: Employee._id };

    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;
    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
