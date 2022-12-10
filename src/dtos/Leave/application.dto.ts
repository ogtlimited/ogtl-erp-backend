/* eslint-disable prettier/prettier */

import {IsBoolean, IsDate, IsDateString, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateLeaveApplicationDTO{

    @IsString()
    public leave_type: string;
    
    @IsString()
    @IsNotEmpty()
    public employee_id: string;

    @IsString()
    @IsOptional()
    public project_id: string;

    @IsString()
    @IsNotEmpty()
    public department_id: string;

    @IsOptional()
    public leave_approver: string | null;

    @IsString()
    @IsOptional()
    public reason_for_application: string;

    @IsBoolean()
    @IsOptional()
    public status: string;

    @IsString()
    @IsOptional()
    public rejection_reason: string;

    @IsBoolean()
    @IsOptional()
    public hr_stage: boolean;

    @IsBoolean()
    @IsOptional()
    public approval_level: number;

    @IsBoolean()
    @IsOptional()
    public acted_on: boolean;

    @IsDateString()
    public from_date: Date;

    @IsDateString()
    public to_date : Date;

}
export class UpdateLeaveApplicationDTO{

    @IsString()
    public _id: string;

    @IsString()
    @IsNotEmpty()
    public employee_id: string;

    @IsString()
    public leave_type: string;

    @IsDateString()
    public from_date: Date;

    @IsDateString()
    public to_date : Date;
    
    @IsOptional()
    public leave_approver: string | null;

    @IsDateString()
    public posting_date: Date;

    @IsString()
    public status: string;

    @IsString()
    @IsOptional()
    public approval_level: string;

    @IsString()
    @IsOptional()
    public project_id: string;

    @IsString()
    @IsOptional()
    public rejection_reason: string;

    @IsString()
    @IsOptional()
    public department_id: string;

    @IsString()
    @IsOptional()
    public reason_for_application: string;
}
