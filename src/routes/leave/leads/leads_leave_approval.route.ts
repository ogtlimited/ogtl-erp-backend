/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';
import { Routes } from '@interfaces/routes.interface';
import LeadsLeaveApplicationController from '@/controllers/Leave/leads/leads_application.controller';

class LeadsLeaveApprovalRoute implements Routes {
  public path = '/leads-leave-approval';
  public router = Router();
  public leadsLeaveApplicationController = new LeadsLeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/:leaveId`, [authMiddleware], this.leadsLeaveApplicationController.approveLeaveApplicationByLead);
  }
}
export default LeadsLeaveApprovalRoute;
