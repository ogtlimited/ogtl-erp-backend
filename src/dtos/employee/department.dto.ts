/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentDto{
    @IsNotEmpty()
    @IsString()
    public department: string;


}
export class UpdateDepartmentDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
    public department: string;


}