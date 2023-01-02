/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';

import { Routes } from '@interfaces/routes.interface';
import HrLeaveApplicationController from '@/controllers/Leave/hr/hr_applications.controller';


class HrLeaveApplicationsRoute implements Routes {
  public path = '/hr-leave-applications';
  public router = Router();
  public hrleaveApplicationController = new HrLeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.hrleaveApplicationController.getLeaveApplicationsForHr);
    this.router.get(`${this.path}/history`, authMiddleware, this.hrleaveApplicationController.getLeaveApplicationHistory);
    this.router.get(`${this.path}/on-leave`, authMiddleware, this.hrleaveApplicationController.countEmployeesOnLeave);
    this.router.get(`${this.path}/leave-types-taken`, authMiddleware, this.hrleaveApplicationController.getTypesOfLeaveTaken);
    this.router.get(`${this.path}/hr-dashboard-analytics`, authMiddleware, this.hrleaveApplicationController.getLeaveStatusCountForHrDashboardAnalytics);
    this.router.patch(`${this.path}/approve/:leaveId`, authMiddleware, this.hrleaveApplicationController.approveLeaveApplicationsByHr);
    this.router.patch(`${this.path}/reject/:leaveId`, authMiddleware, this.hrleaveApplicationController.rejectLeaveApplicationsByHr);
    
   }
}
export default HrLeaveApplicationsRoute;
