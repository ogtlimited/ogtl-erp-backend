/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';

export class LoanDto {  
    @IsString()
    public applicant_type_id: string;

    @IsString()
    public applicant_id: string;

    @IsString()
    public loan_type_id: string;


    @IsString()
    public loan_application_id: string;

    @IsBoolean()
    public repay_from_salary: boolean;

    @IsNumber()
    public loan_amount: number;

    @IsString()
    public repayment_start_date: Date;

    @IsString()
    public repayment_method: String;

    @IsString()
    public mode_of_payment_id: string;

    @IsString()
    public loan_account_id: string;

    @IsString()
    public payment_account_id: string;

    @IsString()
    public interest_income_account_id: string;

    @IsString()
    public status_id: String;
  
}

export class PutLoanDto {
    @IsString()
    public _id: string;

    @IsString()
    public applicant_type_id: string;

    @IsString()
    public applicant_id: string;

    @IsString()
    public loan_type_id: string;


    @IsString()
    public loan_application_id: string;

    @IsBoolean()
    public repay_from_salary: boolean;

    @IsNumber()
    public loan_amount: number;

    @IsString()
    public repayment_start_date: String;

    @IsString()
    public repayment_method: String;

    @IsString()
    public mode_of_payment_id: string;

    @IsString()
    public loan_account_id: string;

    @IsString()
    public payment_account_id: string;

    @IsString()
    public interest_income_account_id: string;

    @IsString()
    public status_id: String;
}