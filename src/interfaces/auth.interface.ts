/* eslint-disable prettier/prettier */
import { EmployeeLoginDto } from '@dtos/employee/employee.dto';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: Employee;
  header: any;
  method: any;
}
