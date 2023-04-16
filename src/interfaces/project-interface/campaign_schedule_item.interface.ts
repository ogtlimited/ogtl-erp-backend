export interface ICampaignScheduleItem {
    _id?: string;
    day: string;
    start: string;
    end: string;
    huddles: boolean;
    huddleTime: string;
    off: boolean;
    campaign_schedule: string
}