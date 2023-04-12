/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CampaignScheduleItemDto {
    @IsNotEmpty()
    @IsString()
    public day: string;

    @IsNotEmpty()
    @IsString()
    public off: boolean;

}

export class UpdateCampaignScheduleItemDto {
    @IsOptional()
    @IsString()
    public day: string;

    @IsOptional()
    @IsString()
    public off: boolean;
}
