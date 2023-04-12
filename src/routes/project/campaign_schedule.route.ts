/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CampaignScheduleDto, UpdateCampaignScheduleDto } from '@/dtos/project/campaign_schedule.dto';
import CampaignScheduleController from '@/controllers/project/campaign_schedule.controller';
import authMiddleware from '@middlewares/auth.middleware';
class CampaignScheduleRoute implements Routes {
    public path = '/campaign-schedules';
    public router = Router();
    public campaignScheduleController = new CampaignScheduleController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}`,  authMiddleware, this.campaignScheduleController.findAllCampaignSchedule);
        this.router.get(`${this.path}/owner`,  authMiddleware, this.campaignScheduleController.findCampaignScheduleByOwnersId);
        this.router.post(`${this.path}`, [validationMiddleware(CampaignScheduleDto, 'body'), authMiddleware], this.campaignScheduleController.createCampaignSchedule);
        this.router.put(`${this.path}/:campaignScheduleId`, [validationMiddleware(UpdateCampaignScheduleDto, 'body'), authMiddleware], this.campaignScheduleController.updateCampaignSchedule);
        this.router.delete(`${this.path}/:campaignScheduleId`, authMiddleware, this.campaignScheduleController.deleteCampaignSchedule);
    }
}

export default CampaignScheduleRoute;
