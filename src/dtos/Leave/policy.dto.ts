/* eslint-disable prettier/prettier */

import { IsNotEmpty,  IsBoolean } from 'class-validator';
export class CreateLeavePolicyDto{
    @IsNotEmpty()
    public leave_type_id: string;

    @IsNotEmpty()
    public annual_allocation: string;

    @IsBoolean()
    public is_active : Boolean;
}

export class UpdateLeavePolicyDto{
    @IsNotEmpty()
    public _id: string;
    
    @IsNotEmpty()
    public leave_type_id: string;

    @IsNotEmpty()
    public annual_allocation: string;

    @IsBoolean()
    public is_active : Boolean;
}