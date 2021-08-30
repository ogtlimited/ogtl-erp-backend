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
  public Employees = EmployeeModel;

  public async signup(EmployeeData: CreateEmployeeDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const findEmployee: Employee = await this.Employees.findOne({ company_email: EmployeeData.company_email });
    if (findEmployee) throw new HttpException(409, `You're email ${EmployeeData.company_email} already exists`);

    const hashedPassword = await bcrypt.hash(EmployeeData.password, 10);
    const createEmployeeData: Employee = await this.Employees.create({ ...EmployeeData, password: hashedPassword });

    return createEmployeeData;
  }

  public async login(EmployeeData: EmployeeLoginDto): Promise<{ token: any; findEmployee: Employee }> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const findEmployee: Employee = await this.Employees.findOne({ ogid: EmployeeData.ogid });
    if (!findEmployee) throw new HttpException(409, `You're email ${EmployeeData.ogid} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(EmployeeData.password, findEmployee.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findEmployee);
    const cookie = this.createCookie(tokenData);
    console.log(tokenData);
    return { token: tokenData, findEmployee };
  }

  public async logout(EmployeeData: Employee): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.company_email, password: EmployeeData.password });
    if (!findEmployee) throw new HttpException(409, `You're email ${EmployeeData.company_email} not found`);

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
