/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';
import { Routes } from '@interfaces/routes.interface';
import LeadsLeaveApplicationController from '@/controllers/Leave/leads/leads_application.controller';


class LeadsLeaveApplicationsRoute implements Routes {
  public path = '/leads-leave-applications';
  public router = Router();
  public leadsLeaveApplicationController = new LeadsLeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.leadsLeaveApplicationController.getLeaveApplicationsForLeads);
    this.router.get(`${this.path}/total-active-leaves`, authMiddleware, this.leadsLeaveApplicationController.getTotalActiveLeaves);
    this.router.get(`${this.path}/appealed-leaves`, authMiddleware, this.leadsLeaveApplicationController.getAppealedLeavesApplicationsForLeads);
    this.router.get(`${this.path}/history`, authMiddleware, this.leadsLeaveApplicationController.getLeaveApplicationHistory);
    this.router.post(`${this.path}/request-modification`, authMiddleware, this.leadsLeaveApplicationController.requestLeaveModification);
   }
}
export default LeadsLeaveApplicationsRoute;
