/* eslint-disable prettier/prettier */

import { IsString, IsDate, IsBoolean, IsNotEmpty, IsDateString } from 'class-validator';
export class CreateLeaveAllocationDto{
    @IsString()
    public employee_id: string;

    @IsString()
    public leave_type_id: string;

    @IsNotEmpty()
    @IsDateString()
    public from_date: Date;

    @IsNotEmpty()
    @IsDateString()
    public to_date : Date;

    @IsString()
    public new_leaves_allocation: string;

    @IsBoolean()
    public add_unused_leaves: Boolean;
}
export class UpdateLeaveAllocationDto{
    @IsString()
    public _id: string;

    @IsString()
    public employee_id: string;

    @IsNotEmpty()
    @IsDateString()
    public from_date: Date;

    @IsNotEmpty()
    @IsDateString()
    public to_date : Date;

    @IsString()
    public new_leaves_allocation: string;

    @IsBoolean()
    public add_unused_leaves: Boolean;
}