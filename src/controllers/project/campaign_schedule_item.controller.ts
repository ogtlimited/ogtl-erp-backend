/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import CampaignScheduleItemService from '@/services/project/campaign_schedule_item.service';

class CampaignScheduleItemController {
    private campaignScheduleItemService = new CampaignScheduleItemService()

    public findAllCampaignScheduleItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const campaignScheduleItems = this.campaignScheduleItemService.findAllCampaignScheduleItems();
            res.status(200).json({ data: campaignScheduleItems });
        } catch (error) {
            next(error);
        }
    };
    public updateCampaignScheduleItem = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { campaignScheduleItemId } = req.param
            const campaignScheduleItem = this.campaignScheduleItemService.updateCampaignScheduleItem(req.body, campaignScheduleItemId);
            res.status(200).json({ data: campaignScheduleItem });
        } catch (error) {
            next(error);
        }
    };
    public deleteCampaignScheduleItem = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { campaignScheduleId } = req.param
            const campaignScheduleItem = this.campaignScheduleItemService.deleteCampaignScheduleItem(campaignScheduleId);
            res.status(200).json({ data: campaignScheduleItem });
        } catch (error) {
            next(error);
        }
    };
}
export default CampaignScheduleItemController;