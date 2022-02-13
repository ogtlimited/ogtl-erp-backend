/* eslint-disable prettier/prettier */
import { CreatePayrollDto } from '../../dtos/payroll/payroll.dto';
import PayRollController from '@/controllers/payroll/payroll.controllers';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class PayRollRoute implements Routes {
    public path = '/api/payroll';
    public router = Router();
    public payRollController = new PayRollController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [authMiddleware], this.payRollController.findAll);
        this.router.get(`${this.path}/:id`, [authMiddleware], this.payRollController.findById);
        this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreatePayrollDto, 'body')], this.payRollController.create);
        // this.router.patch(`${this.path}`, validationMiddleware(DTO, 'body'), this.payRollController.createIncentive);
    }
  }
  export default PayRollRoute;
