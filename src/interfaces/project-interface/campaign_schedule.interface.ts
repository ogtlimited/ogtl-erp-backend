import { ICampaignScheduleItem } from "./campaign_schedule_item.interface";
export interface ICampaignSchedule {
    _id?: string;
    campaign_schedule_items: ICampaignScheduleItem[]
    title: string;
    owner: string;
    campaign: string;
    department: string
}