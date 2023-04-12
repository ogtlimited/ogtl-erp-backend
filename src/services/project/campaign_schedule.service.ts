/* eslint-disable prettier/prettier */

import campaignScheduleModel from '@/models/project/campaign_schedule.model';
import { ICampaignSchedule } from '@/interfaces/project-interface/campaign_schedule.interface';
import { CampaignScheduleDto, UpdateCampaignScheduleDto } from '@/dtos/project/campaign_schedule.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';


class CampaignScheduleService {
    private campaignScheduleModel = campaignScheduleModel;

    public async findAllCampaignSchedule(): Promise<ICampaignSchedule[]> {
        const campaignSchedules: ICampaignSchedule[] = await this.campaignScheduleModel
        .find()
        .populate("owner")
        .populate("campaign")
        .populate("department")
        return campaignSchedules;
    }
    public async findCampaignScheduleByOwnersId(ownerID: string): Promise<ICampaignSchedule> {
        const campaignSchedule: ICampaignSchedule = await this.campaignScheduleModel
        .findOne({_id: ownerID})
        .populate("owner")
        .populate("campaign")
        .populate("department")
        return campaignSchedule;
    }
    public async createCampaignSchedule(payload: CampaignScheduleDto, userId): Promise<ICampaignSchedule> {
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const formatPayload = {
            ...payload,
            owner: userId,
            department: payload.department ? payload.department : null,
            campaign: payload.campaign ? payload.campaign : null
        }
        const campaignSchedule: ICampaignSchedule = await this.campaignScheduleModel.create(formatPayload);
        this.createCampaignScheduleItemsHelperMethod(payload, campaignSchedule._id)
        return campaignSchedule;
    }
    public async updateCampaignSchedule(payload: UpdateCampaignScheduleDto, campaignScheduleId: string): Promise<ICampaignSchedule> {
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const campaignSchedule = await this.campaignScheduleModel.findOne({_id: campaignScheduleId});
        if (!campaignSchedule) throw new HttpException(409, "campaign schedule not found");
        const updateCampaignSchedule: ICampaignSchedule = await this.campaignScheduleModel.findByIdAndUpdate({ _id: campaignScheduleId }, payload, { new: true });
        return updateCampaignSchedule;
    }
    public async deleteCampaignSchedule(campaignScheduleId: string): Promise<ICampaignSchedule> {
        const campaignScheduleExist: ICampaignSchedule = await this.campaignScheduleModel.findOne({ _id: campaignScheduleId });
        if (!campaignScheduleExist) throw new HttpException(409, `${campaignScheduleId} campaign schedule does not exist`);
        const campaignSchedule: ICampaignSchedule = await this.campaignScheduleModel.findByIdAndDelete({ _id: campaignScheduleId });
        return campaignSchedule;
    }
    private async createCampaignScheduleItemsHelperMethod(campaignScheduleData, campaign_schedule): Promise<any> {
        try {
            for (let i = 0; i < campaignScheduleData?.campaignSheduleItems.length; i++) {
                campaignScheduleData.campaign_schedule_items[i].campaign_schedule = campaign_schedule
                await this.campaignScheduleModel.create(campaignScheduleData.campaign_schedule_items[i])
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export default CampaignScheduleService;
