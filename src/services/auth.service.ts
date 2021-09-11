/* eslint-disable prettier/prettier */
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateEmployeeDto, EmployeeLoginDto } from '@dtos/employee/employee.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import bcrypt from 'bcrypt';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';

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
    const employee: Employee = await this.Employees.findOne({ ogid: EmployeeData.ogid });

    if (!employee) throw new HttpException(409, `This ogid ${EmployeeData.ogid} does not exist`);

    const isPasswordMatching: boolean = await bcrypt.compare(EmployeeData.password, employee.password);

    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(employee);
    // const cookie = this.createCookie(tokenData);
    // console.log(tokenData);
    console.log(employee);
    return { token: tokenData, employee };
  }

  public async logout(EmployeeData: EmployeeLoginDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.ogid, password: EmployeeData.password });

    if (!findEmployee) throw new HttpException(409, `Ogid ${EmployeeData.ogid} not found`);

    return findEmployee;
  }
  public createToken(Employee: Employee): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: Employee._id };

    const secretKey: string = config.get('secretKey');

    const expiresIn: number = 60 * 60;
    console.log(dataStoredInToken);

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
