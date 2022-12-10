/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';

import { Routes } from '@interfaces/routes.interface';
import LeaveApplicationController from '@/controllers/Leave/application.controller';


class HrLeaveApplicationsRoute implements Routes {
  public path = '/hr-leave-applications';
  public router = Router();
  public leaveApplicationController = new LeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.leaveApplicationController.getLeaveApplicationsForHr);
    this.router.get(`${this.path}/on-leave`, authMiddleware, this.leaveApplicationController.countEmployeesOnLeave);
    this.router.get(`${this.path}/rejected`, authMiddleware, this.leaveApplicationController.countHrRejectedLeaves);
    this.router.get(`${this.path}/approved`, authMiddleware, this.leaveApplicationController.countHrApprovedLeaves);
    this.router.get(`${this.path}/pending`, authMiddleware, this.leaveApplicationController.countHrPendingLeaves);
    this.router.post(`${this.path}/approve/:leaveId`, authMiddleware, this.leaveApplicationController.approveHrLeaveApplications);
    this.router.post(`${this.path}/reject/:leaveId`, authMiddleware, this.leaveApplicationController.rejectHrLeaveApplications);
    
   }
}
export default HrLeaveApplicationsRoute;
