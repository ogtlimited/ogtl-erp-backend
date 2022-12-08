/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';

import { Routes } from '@interfaces/routes.interface';
import LeaveApplicationController from '@/controllers/Leave/application.controller';


class LeaveCount implements Routes {
  public path = '/leave-count';
  public router = Router();
  public leaveApplicationController = new LeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/used-leaves`, authMiddleware, this.leaveApplicationController.countUsedLeavesByEmployee);
    this.router.get(`${this.path}/used-medical-leaves`, authMiddleware, this.leaveApplicationController.countMedicalLeavesByEmployee);
    this.router.get(`${this.path}/other-used-leaves`, authMiddleware, this.leaveApplicationController.countOtherLeaves);
    this.router.get(`${this.path}/remaining-leaves`, authMiddleware, this.leaveApplicationController.countRemainingLeaves);
   }
}
export default LeaveCount;
