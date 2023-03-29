/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShiftDto {
    @IsNotEmpty()
    @IsString()
    public start: string;

    @IsNotEmpty()
    @IsString()
    public end: string;

    @IsOptional()
    @IsString()
    public campaignID: string;

}

export class UpdateShiftDto {
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
}
