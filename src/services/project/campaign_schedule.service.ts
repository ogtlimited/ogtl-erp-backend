/* eslint-disable prettier/prettier */

import campaignScheduleModel from '@/models/project/campaign_schedule.model';
import campaignScheduleItemModel from '@/models/project/campaign_schedule_item.model';
import { ICampaignSchedule } from '@/interfaces/project-interface/campaign_schedule.interface';
import { CampaignScheduleDto, UpdateCampaignScheduleDto } from '@/dtos/project/campaign_schedule.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import CampaignScheduleItemService from './campaign_schedule_item.service';


class CampaignScheduleService {
    private campaignScheduleModel = campaignScheduleModel;
    private campaignScheduleItemModel = campaignScheduleItemModel;
    private campaignScheduleItemService = new CampaignScheduleItemService();

    public async findAllCampaignSchedule(): Promise<ICampaignSchedule[]> {
        const campaignSchedules: ICampaignSchedule[] = await this.campaignScheduleModel
        .find()
        .populate("owner")
        .populate("campaign")
        .populate("department")
        return campaignSchedules;
    }
    public async findCampaignScheduleByOwnersId(ownerID: string): Promise<ICampaignSchedule[]> {
        const campaignSchedules: ICampaignSchedule[] = await this.campaignScheduleModel
        .find({owner: ownerID})
        .populate("owner")
        .populate("campaign")
        .populate("department")
        return campaignSchedules;
    }
    public async createCampaignSchedule(payload: CampaignScheduleDto, user): Promise<ICampaignSchedule> {
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const formatPayload = {
            ...payload,
            owner: user._id,
            department: user.department ? user.department : null,
            campaign: user.projectId ? user.projectId : null
        }
        const campaignSchedule: ICampaignSchedule = await this.campaignScheduleModel.create(formatPayload);
        this.createCampaignScheduleItemsHelperMethod(payload, campaignSchedule._id)
        return campaignSchedule;
    }
    public async updateCampaignSchedule(payload: UpdateCampaignScheduleDto, campaignScheduleId: string): Promise<ICampaignSchedule> {
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const campaignSchedule = await this.campaignScheduleModel.findById({_id: campaignScheduleId});
        console.log("campaignSchedule", campaignSchedule)
        console.log("campaignScheduleId", campaignScheduleId)
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
            for (let i = 0; i < campaignScheduleData?.campaign_schedule_items.length; i++) {
                campaignScheduleData.campaign_schedule_items[i]["campaign_schedule"] = campaign_schedule
                await this.campaignScheduleItemModel.create(campaignScheduleData.campaign_schedule_items[i])
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export default CampaignScheduleService;
