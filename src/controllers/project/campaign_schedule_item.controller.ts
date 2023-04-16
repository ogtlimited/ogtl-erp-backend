/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import CampaignScheduleItemService from '@/services/project/campaign_schedule_item.service';
import { ICampaignScheduleItem } from '@/interfaces/project-interface/campaign_schedule_item.interface';

class CampaignScheduleItemController {
    private campaignScheduleItemService = new CampaignScheduleItemService()

    public findAllCampaignScheduleItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const campaignScheduleItems: ICampaignScheduleItem[] = await this.campaignScheduleItemService.findAllCampaignScheduleItems();
            res.status(200).json({ data: campaignScheduleItems });
        } catch (error) {
            next(error);
        }
    };
    public findAllCampaignScheduleItemsBelongingToACampaignSchedule = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { campaignScheduleId } = req.params
            const campaignScheduleItems: ICampaignScheduleItem[] = await this.campaignScheduleItemService.findAllCampaignScheduleItemsBelongingToACampaignSchedule(campaignScheduleId);
            res.status(200).json({ data: campaignScheduleItems });
        } catch (error) {
            next(error);
        }
    };
    public updateCampaignScheduleItem = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { campaignScheduleItemId } = req.params
            const campaignScheduleItem: ICampaignScheduleItem[] = await this.campaignScheduleItemService.updateCampaignScheduleItem(req.body);
            res.status(200).json({ data: campaignScheduleItem });
        } catch (error) {
            next(error);
        }
    };
    public deleteCampaignScheduleItem = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { campaignScheduleId } = req.params
            const campaignScheduleItem: ICampaignScheduleItem = await this.campaignScheduleItemService.deleteCampaignScheduleItem(campaignScheduleId);
            res.status(200).json({ data: campaignScheduleItem });
        } catch (error) {
            next(error);
        }
    };
}
export default CampaignScheduleItemController;