/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto{
    @IsNotEmpty()
    @IsString()
    public department: string;

    @IsOptional()
    @IsString()
    public leave_approval_level: string;
}
export class UpdateDepartmentDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
    public department: string;

    @IsOptional()
    @IsString()
    public leave_approval_level: string;
}