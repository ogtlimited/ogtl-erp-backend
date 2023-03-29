/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeShiftDto {
    @IsOptional()
    @IsString()
    public start: string;

    @IsNotEmpty()
    @IsString()
    public day: string;
   
    @IsNotEmpty()
    @IsString()
    public ogid: string;

    @IsOptional()
    @IsString()
    public end: string;
    
    @IsOptional()
    @IsString()
    public expectedWorkTime: string;

    @IsOptional()
    @IsString()
    public campaignID: string;

}

export class UpdateEmployeeShiftDto {
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
    public ogid: string;

    @IsOptional()
    @IsString()
    public day: string;
}
