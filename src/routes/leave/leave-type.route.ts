/* eslint-disable prettier/prettier */

import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from '@/dtos/Leave/leave-type.dto'
import LeaveTypeController from '@/controllers/Leave/leave-type.controller';


 
class LeaveTypeRoutes implements Routes {
  public path = '/leave-type';
  public router = Router();
  public leaveTypeController = new LeaveTypeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.leaveTypeController.getLeaveTypes);
    this.router.get(`${this.path}/:id`, this.leaveTypeController.getLeaveTypeById);
    this.router.post(`${this.path}`, validationMiddleware(CreateLeaveTypeDto, 'body'), this.leaveTypeController.createLeaveType);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateLeaveTypeDto, 'body', true), this.leaveTypeController.updateLeaveType);
    this.router.delete(`${this.path}/:id`, this.leaveTypeController.deleteLeaveType);
  }
}

export default LeaveTypeRoutes;
