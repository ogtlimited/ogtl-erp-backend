/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import CampaignScheduleService from '@/services/project/campaign_schedule.service';
import { ICampaignSchedule } from '@/interfaces/project-interface/campaign_schedule.interface';

class CampaignScheduleController {
    private campaignScheduleService = new CampaignScheduleService()

    public findAllCampaignSchedule = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const campaignSchedules: ICampaignSchedule[]  = await this.campaignScheduleService.findAllCampaignSchedule();
            res.status(200).json({ data: campaignSchedules });
        } catch (error) {
            next(error);
        }
    };
    public findCampaignScheduleByOwnersId = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.user
            const campaignSchedules: ICampaignSchedule[] = await this.campaignScheduleService.findCampaignScheduleByOwnersId(_id);
            res.status(200).json({ data: campaignSchedules });
        } catch (error) {
            next(error);
        }
    };
    public createCampaignSchedule = async (req: any, res: Response, next: NextFunction) => {
        try {
            const campaignSchedule: ICampaignSchedule = await this.campaignScheduleService.createCampaignSchedule(req.body, req.user);
            res.status(200).json({ data: campaignSchedule });
        } catch (error) {
            next(error);
        }
    };
    public updateCampaignSchedule = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { campaignScheduleId } = req.params
            const campaignSchedule: ICampaignSchedule = await this.campaignScheduleService.updateCampaignSchedule(req.body, campaignScheduleId);
            res.status(200).json({ data: campaignSchedule });
        } catch (error) {
            next(error);
        }
    };
    public deleteCampaignSchedule = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { campaignScheduleId } = req.params
            const campaignSchedule: ICampaignSchedule = await this.campaignScheduleService.deleteCampaignSchedule(campaignScheduleId);
            res.status(200).json({ data: campaignSchedule });
        } catch (error) {
            next(error);
        }
    };
}
export default CampaignScheduleController;