/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto{
    @IsNotEmpty()
    @IsString()
    public department: string;

    @IsNotEmpty()
    @IsNumber()
    public leave_approval_level: number;
}
export class UpdateDepartmentDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
    public department: string;
    
    @IsNotEmpty()
    @IsNumber()
    public leave_approval_level: number;
}