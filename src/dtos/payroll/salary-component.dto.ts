/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSalaryComponentDto {  

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    salaryComponentAbbr: string;

    @IsString()
    @IsOptional()
    description: string;
   
    @IsString()
    @IsOptional()
    departmentId: string;

    @IsString()
    @IsOptional()
    projectId: string;

    @IsNumber()
    amount: Number;

    @IsString()
    type: string;

}
