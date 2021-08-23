/* eslint-disable prettier/prettier */



import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateLeaveAllocationDto, UpdateLeaveAllocationDto } from '@/dtos/Leave/allocation.dto';
import LeaveAllocationController from '@/controllers/Leave/allocation.controller';


class LeaveAllocationRoute implements Routes {
  public path = '/leave-allocation';
  public router = Router();
  public leaveAllocationController = new LeaveAllocationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.leaveAllocationController.getLeaveAllocations);
    this.router.get(`${this.path}/:id`, this.leaveAllocationController.getLeaveAllocationById);
    this.router.post(`${this.path}`, validationMiddleware(CreateLeaveAllocationDto, 'body'), this.leaveAllocationController.createLeaveAllocation);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateLeaveAllocationDto, 'body', true), this.leaveAllocationController.updateLeaveAllocation);
    this.router.delete(`${this.path}/:id`, this.leaveAllocationController.deleteLeaveAllocation);
  }
}

export default LeaveAllocationRoute;
