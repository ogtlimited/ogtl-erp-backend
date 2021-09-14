/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';

export class LoanDto {  

    @IsString()
    public applicant_id: string;

    @IsString()
    public loan_type_id: string;


    @IsString()
    public loan_application_id: string;

    @IsBoolean()
    public repay_from_salary: boolean;

    @IsString()
    public loan_amount: string;

    @IsString()
    public repayment_start_date: Date;
  
}

export class PutLoanDto {

    @IsString()
    public applicant_id: string;

    @IsString()
    public loan_type_id: string;


    @IsString()
    public loan_application_id: string;

    @IsBoolean()
    public repay_from_salary: boolean;

    @IsString()
    public loan_amount: string;

    @IsString()
    public repayment_start_date: String;

}