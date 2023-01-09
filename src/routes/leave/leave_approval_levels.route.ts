/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { LeaveApprovalLevelDto } from '@/dtos/Leave/leave_approval_level.dto';
import LeaveApprovalLevelController from '@/controllers/Leave/leave_approval_level.controller';


class LeaveApprovalLevelRoute implements Routes {
  public path = '/leave-approval-level';
  public router = Router();
  public leaveApprovalLevelController = new LeaveApprovalLevelController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, [authMiddleware], this.leaveApprovalLevelController.findAllLeaveApprovalLevels);
    this.router.get(`${this.path}/:leaveApprovalLevelId`, [authMiddleware], this.leaveApprovalLevelController.findLeaveApprovalLevelById);
    this.router.post(`${this.path}`, [validationMiddleware(LeaveApprovalLevelDto, 'body'),authMiddleware], this.leaveApprovalLevelController.createLeaveApprovalLevel);
  }
}
export default LeaveApprovalLevelRoute;
