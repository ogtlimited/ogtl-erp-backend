/* eslint-disable prettier/prettier */

import  authMiddleware  from '@middlewares/auth.middleware';
import { Router } from 'express';
import  permissionMiddleware  from '@/middlewares/permission.middleware';

import { Routes } from '@interfaces/routes.interface';
import LeaveTypeController from '@/controllers/Leave/leave_type.controller';


class LeaveTypeRoute implements Routes {
  public path = '/leave-type';
  public router = Router();
  public leaveTypeController = new LeaveTypeController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.leaveTypeController.getAllLeaveTypes);
    this.router.get(`${this.path}/:id`, authMiddleware, this.leaveTypeController.getLeaveTypeById);
    this.router.post(`${this.path}`, authMiddleware, this.leaveTypeController.createLeaveType);
   }
}
export default LeaveTypeRoute;
