/* eslint-disable prettier/prettier */

import {IsBoolean, IsDate, IsDateString, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateLeaveApplicationDTO{

    @IsString()
    public leave_type_id: string;
    
    @IsString()
    public employee_id: string;

    @IsString()
    @IsOptional()
    public project_id: string;

    @IsString()
    @IsNotEmpty()
    public department_id: string;

    @IsString()
    @IsNotEmpty()
    public leave_approver: string;

    @IsString()
    @IsOptional()
    public reason_for_application: string;

    // @IsBoolean()
    // @IsNotEmpty()
    // public status: boolean;

    @IsString()
    @IsOptional()
    public rejection_reason: string;

    // @IsBoolean()
    // @IsNotEmpty()
    // public hr_stage: boolean;

    @IsBoolean()
    @IsNotEmpty()
    public acted_on: boolean;

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

    @IsString()
    @IsNotEmpty()
    public approval_level: string;
}
