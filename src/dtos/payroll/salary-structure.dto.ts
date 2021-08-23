/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */


import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';
export class CreateSalaryStructureDto {  
 
    @IsString()
    public payrollFrequency: string;

    @IsArray()
    public salaryDeductions: string;
    
    // @IsString()
    // @IsOptional()
    // public currency: string;

    // @IsString()
    // @IsOptional()
    // public base: string;
    
    @IsString()
    public status: string;
    
    @IsNumber()
    public hourRate: Number;
    
    @IsNumber()
    public earning: Number;
    
    @IsNumber()
    public netPay: Number;   

}
