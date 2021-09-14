/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';

export class LoanApplicationDto {  
  @IsString()
  public applicant_name_id: string;

  @IsString()
  public status: string;

  @IsString()
  public loan_type_id: string;

  @IsString()
  public loan_amount: string;

  @IsString()
  public reason: string;

  @IsString()
  public repayment_method: string;
}

export class PutDto {  

  @IsString()
  public loan_type_id: string;

  @IsString()
  public loan_amount: string;

  @IsString()
  public reason: string;

  @IsString()
  public repayment_method: string;
}

export class ApprovalDto {  

  @IsString()
  public status: string;

}