/* eslint-disable prettier/prettier */

import { IsDate, IsString } from 'class-validator';

export class CreateLeaveApplicationDTO{

    @IsString()
    public employee_id: string;

    @IsString()
    public leave_type_id: string;

    @IsDate()
    public from_date: Date;

    @IsDate()
    public to_date : Date;

    @IsString()
    public leave_approver: string;

    @IsDate()
    public posting_date: Date;

    @IsString()
    public reason: string;
    
    @IsString()
    public status: string;
}