/* eslint-disable prettier/prettier */

import campaignScheduleItemModel from '@/models/project/campaign_schedule_item.model';
import { ICampaignScheduleItem } from '@/interfaces/project-interface/campaign_schedule_item.interface';
import { UpdateCampaignScheduleItemDto } from '@/dtos/project/campaign_schedule_item.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';


class CampaignScheduleItemService {
    private campaignScheduleItemModel = campaignScheduleItemModel;

    public async findAllCampaignScheduleItems(): Promise<ICampaignScheduleItem[]> {
        const campaignScheduleItems: ICampaignScheduleItem[] = await this.campaignScheduleItemModel
            .find()
            .populate("campaign_schedule")
        return campaignScheduleItems;
    }
    public async findAllCampaignScheduleItemsBelongingToACampaignSchedule(campaignScheduleId): Promise<ICampaignScheduleItem[]> {
        const campaignScheduleItems: ICampaignScheduleItem[] = await this.campaignScheduleItemModel
            .find({ campaign_schedule: campaignScheduleId })
            .populate("campaign_schedule")
        return campaignScheduleItems;
    }
    public async updateCampaignScheduleItem(payload: UpdateCampaignScheduleItemDto[]): Promise<ICampaignScheduleItem[]> {
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        let updateCampaignScheduleItemById: ICampaignScheduleItem[] = []
        for (let i = 0; i < payload?.length; i++) {
            const updatedcampaignScheduleItem = await this.campaignScheduleItemModel
                .findByIdAndUpdate({ _id: payload[i]._id }, payload[i], { new: true })
            updateCampaignScheduleItemById.push(updatedcampaignScheduleItem);
        }
        return updateCampaignScheduleItemById;   
    }
    public async deleteCampaignScheduleItem(campaignScheduleItemId: string): Promise<ICampaignScheduleItem> {
        const campaignScheduleItemExist: ICampaignScheduleItem = await this.campaignScheduleItemModel.findOne({ _id: campaignScheduleItemId });
        if (!campaignScheduleItemExist) throw new HttpException(409, `${campaignScheduleItemId} campaign schedule item does not exist`);
        const campaignScheduleItem: ICampaignScheduleItem = await this.campaignScheduleItemModel.findByIdAndDelete({ _id: campaignScheduleItemId });
        return campaignScheduleItem;
    }
}

export default CampaignScheduleItemService;
