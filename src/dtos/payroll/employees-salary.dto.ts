/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsString, IsNumber, IsOptional} from 'class-validator';

export class CreateEmployeeSalaryDto {

  @IsOptional()
  @IsString({each:true})
  public ogid: string;

  @IsString()
  @IsOptional()
  public employeeId: String

  @IsString()
  @IsOptional()
  public employeeEmail: String

  @IsNumber()
  @IsOptional()
  public basic: Number

  @IsNumber()
  @IsOptional()
  public medical: Number

  @IsNumber()
  @IsOptional()
  public housing: Number

  @IsNumber()
  @IsOptional()
  public transport: Number

  @IsNumber()
  @IsOptional()
  public otherAllowances: Number

  @IsNumber()
  @IsOptional()
  public monthlySalary: Number

  @IsNumber()
  @IsOptional()
  public totalRelief: Number

  @IsNumber()
  @IsOptional()
  public monthlyIncomeTax: Number

  @IsNumber()
  @IsOptional()
  public monthlyEmployeePension: Number

  @IsNumber()
  @IsOptional()
  public netPay: Number

  @IsString()
  @IsOptional()
  public updatedBy: String

}

export class UpdateEmployeeSalaryDto {

  @IsString()
  public company_email: string

  @IsNumber()
  public annualGrossSalary: number

  @IsNumber()
  @IsOptional()
  public monthlySalary: number

}
