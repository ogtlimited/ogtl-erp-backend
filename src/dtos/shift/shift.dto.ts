/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShiftDto {
    @IsNotEmpty()
    @IsString()
    public start_time: string;

    @IsNotEmpty()
    @IsString()
    public end_time: string;

    @IsOptional()
    @IsString()
    public campaignID: string;

}

export class UpdateShiftDto {
    @IsString()
    public _id: string;

    @IsOptional()
    @IsString()
    public start_time: string;

    @IsOptional()
    @IsString()
    public end_time: string;

    @IsOptional()
    @IsString()
    public campaignID: string;
}
