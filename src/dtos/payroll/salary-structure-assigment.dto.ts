/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateSalaryStructureAssignmentDto {  
 
    @IsString()
    public employee: string;

    @IsString()
    public department: string;

    @IsString()
    public incomeTaxSlab: string;
   
    @IsString()
    public status: string;

    @IsNumber()
    public salaryStructure: Number;

    @IsDate()
    public fromDate: Date;

}
