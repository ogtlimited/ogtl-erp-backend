/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ICampaignScheduleItem } from '@/interfaces/project-interface/campaign_schedule_item.interface';

export class CampaignScheduleDto {
    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsArray()
    campaign_schedule_items: ICampaignScheduleItem[]
}

export class UpdateCampaignScheduleDto {
    @IsOptional()
    @IsString()
    public title: string;
}
