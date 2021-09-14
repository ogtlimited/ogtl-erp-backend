/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class LoanTypeDto { 
    @IsString() 
    public loan_name: string;

    @IsString()
    public maximum_loan_amount: string;

    @IsNumber()
    public rate_of_interest: Number;

    @IsNumber()
    public percentage_loan: Number;
    
    @IsNumber()
    public min_stay: Number;

    @IsString()
    public description: string;

    @IsBoolean()
    public disabled: Boolean;
}

export class UpdateLoanTypeDto { 
    @IsString() 
    public loan_name: string;

    @IsString()
    public maximum_loan_amount: string;

    @IsNumber()
    public rate_of_interest: Number;

    @IsNumber()
    public percentage_loan: Number;

    @IsNumber()
    public min_stay: Number;

    @IsString()
    public description: string;

    @IsBoolean()
    public disabled: Boolean;
}