/* eslint-disable prettier/prettier */
import { CreatePayrollDto } from '../../dtos/payroll/payroll.dto';
import PayRollEntryController from '@/controllers/payroll/payroll.controllers';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class PayRollRoute implements Routes {
    public path = '/api/payroll';
    public router = Router();
    public payRollEntryController = new PayRollEntryController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [], this.payRollEntryController.findAll);
        this.router.get(`${this.path}/:id`, [], this.payRollEntryController.findById);
        this.router.post(`${this.path}`, [validationMiddleware(CreatePayrollDto, 'body')], this.payRollEntryController.create);
        // this.router.patch(`${this.path}`, validationMiddleware(DTO, 'body'), this.payRollEntryController.createIncentive);
    }
  }
  export default PayRollRoute;