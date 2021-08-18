/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';

export class CreatePayrollDto {  
  @IsString()
  public _id: string;

  @IsString()
  public branch: string;

  @IsString()
  public department: string;

  @IsString()
  public status: string;

  @IsString()
  public payrollFrequency: string;

  @IsString()
  public paymentAccount: string;

  @IsDate()
  public startDate: Date;
  
  @IsDate()
  public endDate: Date;

  @IsBoolean()
  public salarySlipsCreated: Date;

  @IsBoolean()
  public validateAttendance: Date;
  
  @IsBoolean()
  public salarySlipsSubmitted: Date;
  
  @IsBoolean()
  public deductTaxForUnsubmittedTaxExemptionProof: Date;
  
  @IsBoolean()
  public deductTaxForUnclaimedEmployeeBenefits: Date;
  
  @IsNumber()
  public numberOfEmployees: Number;
  
//   @IsArray()
//   public endTime: Date;

  

}
