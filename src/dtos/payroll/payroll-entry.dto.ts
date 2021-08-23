/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';

export class CreatePayrollDto {  
  
  @IsString()
  public branch: string;

  @IsString()
  public department: string;

  @IsString()
  public paymentAccount: string;

  @IsString()
  public status: string;
  
  @IsString()
  public payrollFrequency: string;
  
  @IsDate()
  public startDate: Date;
  
  @IsDate()
  public endDate: Date;

  @IsBoolean()
  public salarySlipsCreated: Date;

  @IsBoolean()
  public validateAttendance: Boolean;
  
  @IsBoolean()
  public salarySlipsSubmitted: Boolean;
  
  @IsBoolean()
  public deductTaxForUnsubmittedTaxExemptionProof: Boolean;
  
  @IsBoolean()
  public deductTaxForUnclaimedEmployeeBenefits: Boolean;
  
  @IsNumber()
  public numberOfEmployees: Number;

}
