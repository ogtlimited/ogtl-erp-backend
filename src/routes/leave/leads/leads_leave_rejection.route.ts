/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import LeaveApplicationController from '@/controllers/Leave/application.controller';


class LeadsLeaveRejectionRoute implements Routes {
  public path = '/leads-leave-rejection';
  public router = Router();
  public leaveApplicationController = new LeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/:leaveId`, [authMiddleware], this.leaveApplicationController.rejectLeadsLeaveApplications);
  }
}
export default LeadsLeaveRejectionRoute;
