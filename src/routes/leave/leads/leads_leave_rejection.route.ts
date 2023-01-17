/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';
import { Routes } from '@interfaces/routes.interface';
import LeadsLeaveApplicationController from '@/controllers/Leave/leads/leads_application.controller';


class LeadsLeaveRejectionRoute implements Routes {
  public path = '/leads-leave-rejection';
  public router = Router();
  public leadsLeaveApplicationController = new LeadsLeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.patch(`${this.path}/:leaveId`, [authMiddleware], this.leadsLeaveApplicationController.rejectLeaveApplication);
  }
}
export default LeadsLeaveRejectionRoute;
