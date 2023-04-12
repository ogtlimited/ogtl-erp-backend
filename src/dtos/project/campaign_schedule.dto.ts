/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CampaignScheduleDto {
    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public owner: string;

    @IsNotEmpty()
    @IsString()
    public campaign: string;

    @IsNotEmpty()
    @IsString()
    public department: string;
}

export class UpdateCampaignScheduleDto {
    @IsOptional()
    @IsString()
    public title: string;

    @IsOptional()
    @IsString()
    public owner: string;

    @IsOptional()
    @IsString()
    public campaign: string;

    @IsOptional()
    @IsString()
    public department: string;
}
