/* eslint-disable prettier/prettier */

import {IsBoolean, IsDate, IsDateString, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateLeaveApplicationDTO{

    @IsString()
    public leave_type: string;

    @IsString()
    @IsOptional()
    public project_id: string;

    @IsString()
    @IsOptional()
    public reason_for_application: string;

    @IsString()
    @IsOptional()
    public rejection_reason: string;

    @IsDateString()
    public from_date: Date;

    @IsDateString()
    public to_date : Date;

}
export class UpdateLeaveApplicationDTO{

    @IsString()
    public _id: string;

    @IsString()
    public leave_type: string;

    @IsDateString()
    public from_date: Date;

    @IsDateString()
    public to_date : Date;

    @IsDateString()
    public posting_date: Date;

    @IsString()
    @IsOptional()
    public project_id: string;

    @IsString()
    @IsOptional()
    public rejection_reason: string;

    @IsString()
    @IsOptional()
    public reason_for_application: string;
}
