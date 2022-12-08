/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import LeaveApplicationController from '@/controllers/Leave/application.controller';


class CheckWhetherUserIsALeadRoute implements Routes {
  public path = '/is-user-a-lead';
  public router = Router();
  public leaveApplicationController = new LeaveApplicationController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, [authMiddleware], this.leaveApplicationController.checkWhetherUserIsALead);
  }
}
export default CheckWhetherUserIsALeadRoute;
