/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';

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
    this.router.get(`${this.path}`, authMiddleware, this.leaveApplicationController.getLeaveApplication);
    this.router.get(`${this.path}/leave-application-progress`, authMiddleware, this.leaveApplicationController.getLeaveApplicationProgress);
    this.router.get(`${this.path}/all-leave-approvers`, authMiddleware, this.leaveApplicationController.getAllLeaveAprovers);
    this.router.get(`${this.path}/team-member/all`, authMiddleware, this.leaveApplicationController.findAllTeamMembersLeave);
    this.router.get(`${this.path}/client-approval/:id`, authMiddleware, this.leaveApplicationController.findAllLeaveapplicationsClient);
    this.router.patch(`${this.path}/appeal-rejected-leave`, authMiddleware, this.leaveApplicationController.appealRejectedLeave);
    this.router.post(`${this.path}`, [validationMiddleware(CreateLeaveApplicationDTO, 'body'),authMiddleware], this.leaveApplicationController.createLeaveApplication);
    this.router.put(`${this.path}/update-leavecount`, [authMiddleware, permissionMiddleware('HR')], this.leaveApplicationController.updateLeaveCount);
    this.router.put(`${this.path}/:id`, [validationMiddleware(UpdateLeaveApplicationDTO, 'body', true), authMiddleware], this.leaveApplicationController.updateLeaveApplication);
  }
}

export default LeaveApplicationRoute;
