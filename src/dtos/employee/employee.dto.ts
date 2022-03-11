/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { Type } from 'class-transformer';
import { IsEmail, IsString, IsBoolean, IsNumber, IsDateString, IsOptional, ValidateNested } from 'class-validator';

export class CreateEmployeeDto {


  @IsDateString()
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

  @IsBoolean()
  public isAdmin: boolean;

  @IsString()
  public gender: string;

  @IsOptional()
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

  @IsOptional()
  @IsBoolean()
  public isExpatriate: boolean;

  @IsOptional()
  @IsBoolean()
  public isLeaverApprover: boolean;

  @IsString()
  public employeeType: string;

  @IsString()
  public projectId: string;

  @IsOptional()
  leaveCount: number;



}
export class CreateMultipleEmployeeDto {


  employees: CreateEmployeeDto[];
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

  @IsString()
  public employeeType: string;

  @IsNumber()
  public permissionLevel: number;
  
  @IsOptional()
  @IsBoolean()
  public isExpatriate: boolean;

  @IsOptional()
  @IsBoolean()
  public isRepSiever: boolean;

  @IsOptional()
  @IsBoolean()
  public isLeaverApprover: boolean;



}
export class UpdateEmployeePermissionDto{
  @IsEmail()
  public company_email: string;

  @IsNumber()
  public permissionLevel: number
}
export class UpdateEmployeeRoleDto{
  @IsString()
  public _id: string;

  @IsString()
  public role: string

  @IsBoolean()
  public isRepSiever: boolean
}

export class EmployeeLoginDto {
  @IsString()
  public company_email: string;

  @IsOptional()
  @IsString()
  public date_of_joining: string;

  @IsOptional()
  @IsString()
  public default_shift: string;

  @IsString()
  @IsOptional()
  public department: string;


  @IsOptional()
  @IsString()
  public designation: string;

  @IsOptional()
  @IsString()
  public first_name: string;

  @IsOptional()
  @IsBoolean()
  public isAdmin: boolean;

  @IsOptional()
  @IsString()
  public gender: string;

  @IsOptional()
  @IsString()
  public image: string;

  @IsOptional()
  @IsString()
  public last_name: string;

  @IsOptional()
  @IsString()
  public middle_name: string;

  @IsOptional()
  @IsString()
  public reports_to: string;

  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public branch: string;

  @IsOptional()
  @IsString()
  public employeeType: string;

  @IsOptional()
  @IsString()
  public projectId: string;

  @IsOptional()
  leaveCount: number;

}
