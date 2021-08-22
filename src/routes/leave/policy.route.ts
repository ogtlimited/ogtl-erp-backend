/* eslint-disable prettier/prettier */

import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateLeavePolicyDto, UpdateLeavePolicyDto } from '@/dtos/Leave/policy.dto'
import LeavePolicyController from '@/controllers/Leave/policy.controller';



class LeavePolicyRoutes implements Routes {
  public path = '/leave-Policy';
  public router = Router();
  public leavePolicyController = new LeavePolicyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.leavePolicyController.getLeavePolicys);
    this.router.get(`${this.path}/:id`, this.leavePolicyController.getLeavePolicyById);
    this.router.post(`${this.path}`, validationMiddleware(CreateLeavePolicyDto, 'body'), this.leavePolicyController.createLeavePolicy);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateLeavePolicyDto, 'body', true), this.leavePolicyController.updateLeavePolicy);
    this.router.delete(`${this.path}/:id`, this.leavePolicyController.deleteLeavePolicy);
  }
}

export default LeavePolicyRoutes;
