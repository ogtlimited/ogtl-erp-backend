/* eslint-disable prettier/prettier */

import {IsDate, IsDateString, IsOptional, IsString} from 'class-validator';

export class CreateLeaveApplicationDTO{

    @IsString()
    public leave_type_id: string;

    @IsDateString()
    public from_date: Date;

    @IsDateString()
    public to_date : Date;
    
    @IsString()
    public reason: string;

}
export class UpdateLeaveApplicationDTO{

    @IsString()
    public _id: string;

    @IsString()
    public employee_id: string;

    @IsString()
    public leave_type_id: string;

    @IsDateString()
    public from_date: Date;

    @IsDateString()
    public to_date : Date;

    @IsString()
    public leave_approver: string;

    @IsDateString()
    public posting_date: Date;

    @IsString()
    public reason: string;

    @IsString()
    public status: string;
}
