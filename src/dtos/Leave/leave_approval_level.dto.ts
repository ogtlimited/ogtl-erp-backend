/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LeaveApprovalLevelDto{
    @IsString()
    @IsNotEmpty()
    public designation_id: string;
    
    @IsString()
    @IsNotEmpty()
    public department_id: string;

    @IsNumber()
    @IsNotEmpty()
    public approval_level: number;
}
