/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import CampaignScheduleService from '@/services/project/campaign_schedule.service';

class CampaignScheduleController {
    private campaignScheduleService = new CampaignScheduleService()

    public findAllCampaignSchedule = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const campaignSchedules = this.campaignScheduleService.findAllCampaignSchedule();
            res.status(200).json({ data: campaignSchedules });
        } catch (error) {
            next(error);
        }
    };
    public findCampaignScheduleByOwnersId = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.user
            const campaignSchedule = this.campaignScheduleService.findCampaignScheduleByOwnersId(_id);
            res.status(200).json({ data: campaignSchedule });
        } catch (error) {
            next(error);
        }
    };
    public createCampaignSchedule = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.user
            const campaignSchedule = this.campaignScheduleService.createCampaignSchedule(req.body, _id);
            res.status(200).json({ data: campaignSchedule });
        } catch (error) {
            next(error);
        }
    };
    public updateCampaignSchedule = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { campaignScheduleId } = req.param
            const campaignSchedule = this.campaignScheduleService.updateCampaignSchedule(req.body, campaignScheduleId);
            res.status(200).json({ data: campaignSchedule });
        } catch (error) {
            next(error);
        }
    };
    public deleteCampaignSchedule = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { campaignScheduleId } = req.param
            const campaignSchedule = this.campaignScheduleService.deleteCampaignSchedule(campaignScheduleId);
            res.status(200).json({ data: campaignSchedule });
        } catch (error) {
            next(error);
        }
    };
}
export default CampaignScheduleController;