/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateLeaveAllocationDto, UpdateLeaveAllocationDto } from '@/dtos/Leave/allocation.dto';
import LeaveSettingsController from '@/controllers/Leave/leave-settings.controller';



class LeaveSettingsRoute implements Routes {
  public path = '/leave-settings';
  public router = Router();
  public leaveAllocationController = new LeaveSettingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.leaveAllocationController.getLeaveSettingss);
    this.router.get(`${this.path}/:id`, this.leaveAllocationController.getLeaveSettingsById);
    this.router.post(`${this.path}`, validationMiddleware(CreateLeaveAllocationDto, 'body'), this.leaveAllocationController.createLeaveSettings);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateLeaveAllocationDto, 'body', true), this.leaveAllocationController.updateLeaveSettings);
    this.router.delete(`${this.path}/:id`, this.leaveAllocationController.deleteLeaveSettings);
  }
}

export default LeaveSettingsRoute;