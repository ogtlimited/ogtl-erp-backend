/* eslint-disable prettier/prettier */

import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateLeaveApplicationDTO, UpdateLeaveApplicationDTO } from '@/dtos/Leave/application.dto';
import LeaveApplicationController from '@/controllers/Leave/application.controller';


class LeaveApplicationRoute implements Routes {
  public path = '/leave-application';
  public router = Router();
  public leaveApplicationController = new LeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.leaveApplicationController.getLeaveApplications);
    this.router.get(`${this.path}/:id`, this.leaveApplicationController.getLeaveApplicationById);
    this.router.post(`${this.path}`, validationMiddleware(CreateLeaveApplicationDTO, 'body'), this.leaveApplicationController.createLeaveApplication);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateLeaveApplicationDTO, 'body', true), this.leaveApplicationController.updateLeaveApplication);
    this.router.delete(`${this.path}/:id`, this.leaveApplicationController.deleteLeaveApplication);
  }
}

export default LeaveApplicationRoute;
