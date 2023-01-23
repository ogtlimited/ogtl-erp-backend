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
    this.router.get(`${this.path}`, [authMiddleware], this.leaveApplicationController.getLeaveApplications);
    this.router.get(`${this.path}/:id`, authMiddleware, this.leaveApplicationController.getLeaveApplicationById);
    this.router.get(`${this.path}/team-member/all`, authMiddleware, this.leaveApplicationController.findAllTeamMembersLeave);
    this.router.get(`${this.path}/client-approval/:id`, authMiddleware, this.leaveApplicationController.findAllLeaveapplicationsClient);
    this.router.post(`${this.path}`, [validationMiddleware(CreateLeaveApplicationDTO, 'body'),authMiddleware], this.leaveApplicationController.createLeaveApplication);
    this.router.put(`${this.path}/update-leavecount`, [authMiddleware, permissionMiddleware('HR')], this.leaveApplicationController.updateLeaveCount);
    this.router.put(`${this.path}/lead/approve`, [validationMiddleware(UpdateLeaveApplicationDTO, 'body', true), authMiddleware], this.leaveApplicationController.supervisorApproveLeave);
    this.router.put(`${this.path}/hr/approve/:id`, [validationMiddleware(UpdateLeaveApplicationDTO, 'body', true), authMiddleware, permissionMiddleware('HR')], this.leaveApplicationController.hrApproveLeave);
    this.router.put(`${this.path}/:id`, [validationMiddleware(UpdateLeaveApplicationDTO, 'body', true), authMiddleware, permissionMiddleware('HR')], this.leaveApplicationController.updateLeaveApplication);
    this.router.delete(`${this.path}/:id`,authMiddleware, this.leaveApplicationController.deleteLeaveApplication);
  }
}

export default LeaveApplicationRoute;
