/* eslint-disable prettier/prettier */
import {IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExitDto{
    

    @IsNotEmpty()
    @IsString()    
    public employee_id: string;

    @IsNotEmpty()
    @IsDateString()
    public effective_date: Date;
    
    @IsOptional()
    @IsBoolean()
    public deactivated: Boolean;

    @IsString()
    public reason_for_resignation: string;

   
    
}
export class UpdateExitDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()    
    public employee_id: string;
    
    @IsNotEmpty()
    @IsDateString()
    public effective_date: Date;

    @IsOptional()
    @IsBoolean()
    public deactivated: Boolean;
     
    @IsString()
    public reason_for_resignation: string;
    
}
