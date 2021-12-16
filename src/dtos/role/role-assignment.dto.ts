/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleAssignmentDto{
    @IsNotEmpty()
    @IsString()
    public RoleId: string;


    @IsNotEmpty()
    @IsString()
    public assigned_to: string;

    @IsNotEmpty()
    @IsString()
    public assigned_by: string;

    
    




}

export class UpdateRoleAssignmentDto{
    @IsString()
    public _id : string;

    @IsOptional()
    @IsString()
    public RoleId: string;


    @IsOptional()
    @IsString()
    public assigned_to: string;

    @IsOptional()
    @IsString()
    public assigned_by: string;


    
}

