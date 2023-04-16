/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CampaignScheduleItemDto {
    @IsNotEmpty()
    @IsString()
    public day: string;

    @IsNotEmpty()
    @IsBoolean()
    public off: boolean;

    @IsNotEmpty()
    @IsString()
    public start: string;

    @IsNotEmpty()
    @IsString()
    public end: string;

    @IsOptional()
    @IsBoolean()
    public huddles: boolean;

    @IsOptional()
    @IsString()
    public huddleTime: string;
}

export class UpdateCampaignScheduleItemDto {
    @IsOptional()
    @IsString()
    public _id: string;
    
    @IsOptional()
    @IsString()
    public day: string;

    @IsOptional()
    @IsBoolean()
    public off: boolean;

    @IsOptional()
    @IsString()
    public start: string;

    @IsOptional()
    @IsString()
    public end: string;

    @IsOptional()
    @IsBoolean()
    public huddles: boolean;

    @IsOptional()
    @IsString()
    public huddleTime: string;
}
