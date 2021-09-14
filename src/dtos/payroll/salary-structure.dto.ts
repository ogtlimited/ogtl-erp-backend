/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */


import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateSalaryStructureDto {  
    @IsArray()
    public deductions: Array<String>;
    @IsArray()
    public earnings: Array<String>;
    @IsString()
    @IsOptional()
    public departmentId: String;
    @IsString()
    @IsOptional()
    public projectId: String;
    @IsString()
    public title: String;
}

export class UpdateSalaryStructureDto {  
    @IsArray()
    @IsOptional()
    public deductions: Array<String>;
    @IsArray()
    @IsOptional()
    public earnings: Array<String>;
    @IsString()
    @IsOptional()
    public departmentId: String;
    @IsString()
    @IsOptional()
    public projectId: String;
    @IsString()
    @IsOptional()
    public title: String;
}
