/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';

import { Routes } from '@interfaces/routes.interface';
import LeaveApplicationController from '@/controllers/Leave/application.controller';


class LeadsLeaveApplicationsRoute implements Routes {
  public path = '/leads-leave-applications';
  public router = Router();
  public leaveApplicationController = new LeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.leaveApplicationController.getLeaveApplicationsForLeads);
   }
}
export default LeadsLeaveApplicationsRoute;
