/* eslint-disable prettier/prettier */

import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateLeavePeriodDto, UpdateLeavePeriodDto } from '@/dtos/Leave/period.dto'
import LeavePeriodController from '@/controllers/Leave/period.controller';



class LeavePeriodRoute implements Routes {
  public path = '/leave-period';
  public router = Router();
  public leavePeriodController = new LeavePeriodController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.leavePeriodController.getLeavePeriods);
    this.router.get(`${this.path}/:id`, this.leavePeriodController.getLeavePeriodById);
    this.router.post(`${this.path}`, validationMiddleware(CreateLeavePeriodDto, 'body'), this.leavePeriodController.createLeavePeriod);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateLeavePeriodDto, 'body', true), this.leavePeriodController.updateLeavePeriod);
    this.router.delete(`${this.path}/:id`, this.leavePeriodController.deleteLeavePeriod);
  }
}

export default LeavePeriodRoute;
