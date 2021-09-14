/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsEmail, IsString, IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { EmployeeType } from '@interfaces/employee-interface/employee.interface';

export class CreateEmployeeDto {


  @IsString()
  public date_of_joining: string;

  @IsString()
  public default_shift: string;

  @IsString()
  @IsOptional()
  public department: string;

  @IsString()
  public password: string;

  @IsEmail()
  public company_email: string;

  @IsString()
  public designation: string;

  @IsString()
  public first_name: string;

  @IsString()
  @IsOptional()
  public employment_type: string;

  @IsBoolean()
  public isAdmin: boolean;

  @IsString()
  public gender: string;

  @IsString()
  public image: string;

  @IsString()
  public last_name: string;

  @IsString()
  public middle_name: string;

  @IsString()
  public reports_to: string;

  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public branch: string;

  @IsEnum(EmployeeType)
  public employeeType: EmployeeType;

  @IsString()
  public projectId: string;



}

export class UpdateEmployeeDto {

  @IsEmail()
  public company_email: string;

  @IsString()
  public default_shift: string;

  @IsString()
  public department: string;

  @IsString()
  public password: string;

  @IsString()
  public designation: string;

  @IsString()
  public first_name: string;

  @IsOptional()
  public employment_type: string;

  @IsBoolean()
  public isAdmin: boolean;
  gender: string;

  @IsString()
  public image: string;

  @IsString()
  public last_name: string;

  @IsString()
  public middle_name: string;

  @IsString()
  public reports_to: string;

  @IsString()
  public status: string;

  @IsNumber()
  public permissionLevel: number;


}
export class UpdateEmployeePermissionDto{
  @IsEmail()
  public company_email: string;

  @IsNumber()
  public permissionLevel: number
}

export class EmployeeLoginDto {
  @IsString()
  public ogid: string;

  @IsString()
  public password: string;
}
