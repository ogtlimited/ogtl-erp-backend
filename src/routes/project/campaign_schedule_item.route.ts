/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { UpdateCampaignScheduleItemDto } from '@/dtos/project/campaign_schedule_item.dto';
import CampaignScheduleItemController from '@/controllers/project/campaign_schedule_item.controller';
import authMiddleware from '@middlewares/auth.middleware';

class CampaignScheduleRoute implements Routes {
    public path = '/campaign-schedule-items';
    public router = Router();
    public campaignScheduleItemController = new CampaignScheduleItemController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.campaignScheduleItemController.findAllCampaignScheduleItems);
        this.router.put(`${this.path}/:campaignScheduleItemId`, [validationMiddleware(UpdateCampaignScheduleItemDto, 'body'), authMiddleware], this.campaignScheduleItemController.updateCampaignScheduleItem);
        this.router.delete(`${this.path}/:campaignScheduleId`, authMiddleware, this.campaignScheduleItemController.deleteCampaignScheduleItem);
    }
}

export default CampaignScheduleRoute;
