/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { ICampaignScheduleItem } from '@/interfaces/project-interface/campaign_schedule_item.interface';

const campaignScheduleItemSchema: Schema = new Schema(
    {
        day: {
            type: String,
            enum: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"]
        },
        off: {
            type: Boolean,
            default: false,
        },
        campaign_schedule: {
            type: Schema.Types.ObjectId,
            ref: 'CampaignSchedule',
            default: null
        }
    },
    {
        timestamps: true,
    },
);

const campaignScheduleItemModel = model<ICampaignScheduleItem & Document>('campaignscheduleitem', campaignScheduleItemSchema);
export default campaignScheduleItemModel;
