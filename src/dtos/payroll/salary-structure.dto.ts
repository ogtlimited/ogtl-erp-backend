/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsNumber } from 'class-validator';

export class CreateSalaryStructureAssignmentDto {  
 
    @IsString()
    public payroll_frequency: string;

    @IsString()
    public salaryDeductions: string;
    
    @IsString()
    public currency: string;
    
    @IsString()
    public status: string;
    
    @IsNumber()
    public hourRate: Number;
    
    @IsNumber()
    public earning: Number;
    
    @IsNumber()
    public netPay: Number;   

}
