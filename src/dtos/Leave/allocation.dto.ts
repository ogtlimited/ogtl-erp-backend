/* eslint-disable prettier/prettier */

import { IsString, IsDate, IsBoolean, IsNotEmpty } from 'class-validator';
export class CreateLeaveAllocationDto{
    @IsString()
    public employee_id: string;

    @IsString()
    public leave_type_id: string;

    @IsNotEmpty()
    @IsDate()
    public from_date: Date;

    @IsNotEmpty()
    @IsDate()
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
    @IsDate()
    public from_date: Date;

    @IsNotEmpty()
    @IsDate()
    public to_date : Date;

    @IsString()
    public new_leaves_allocation: string;

    @IsBoolean()
    public add_unused_leaves: Boolean;
}