/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { ICampaignSchedule } from '@/interfaces/project-interface/campaign_schedule.interface';

const campaignScheduleSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        },
        campaign: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            default: null
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            default: null
        }
    },
    {
        timestamps: true,
    },
);

const campaignScheduleModel = model<ICampaignSchedule & Document>('campaignschedule', campaignScheduleSchema);
export default campaignScheduleModel;
