/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeShiftDto {
    @IsOptional()
    @IsString()
    public start: string;

    @IsNotEmpty()
    @IsString()
    public day: string;

    @IsOptional()
    @IsString()
    public end: string;
    
    @IsOptional()
    @IsString()
    public expectedWorkTime: string;

    @IsOptional()
    @IsString()
    public campaignID: string;

    @IsOptional()
    @IsString()
    public departmentID: string;
    
    @IsOptional()
    @IsString()
    public off: boolean;

    @IsOptional()
    @IsString()
    public ogid: string;
    
    @IsOptional()
    @IsString()
    public huddles: boolean;
    
    @IsOptional()
    @IsString()
    public huddleTime: string;

}

export class UpdateEmployeeShiftDto {
    @IsOptional()
    @IsString()
    public _id: string;

    @IsOptional()
    @IsString()
    public start: string;

    @IsOptional()
    @IsString()
    public end: string;

    @IsOptional()
    @IsString()
    public campaignID: string;

    @IsOptional()
    @IsString()
    public day: string;

    @IsOptional()
    @IsString()
    public expectedWorkTime: string;

    @IsOptional()
    @IsString()
    public off: boolean;

    @IsOptional()
    @IsString()
    public huddles: boolean;

    @IsOptional()
    @IsString()
    public huddleTime: string;
   
    // For the purpose of external database
    @IsString()
    public ogid: string;
}
