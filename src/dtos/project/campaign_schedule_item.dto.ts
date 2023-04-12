/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CampaignScheduleItemDto {
    @IsNotEmpty()
    @IsString()
    public day: string;

    @IsNotEmpty()
    @IsBoolean()
    public off: boolean;

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
}
