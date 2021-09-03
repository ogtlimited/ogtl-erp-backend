/* eslint-disable prettier/prettier */
import { CreateIncentiveDto } from '../../dtos/payroll/incentives.dto';
import IncentiveController from '@/controllers/payroll/incentives.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';


class IncentiveRoute implements Routes {
    public path = '/api/incentive';
    public router = Router();
    public incentiveController = new IncentiveController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [authMiddleware], this.incentiveController.getIncentives);
        this.router.get(`${this.path}/:id`, [authMiddleware], this.incentiveController.getIncentiveById);
        this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreateIncentiveDto, 'body')], this.incentiveController.createIncentive);
        // this.router.patch(`${this.path}`, validationMiddleware(CreateIncentiveDto, 'body'), this.incentiveController.createIncentive);
    }
  }
  export default IncentiveRoute;