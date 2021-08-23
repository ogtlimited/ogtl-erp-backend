/* eslint-disable prettier/prettier */
import { CreatePayrollDto } from '../../dtos/payroll/payroll-entry.dto';
import PayRollEntryController from '@/controllers/payroll/payroll-entry.controllers';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class PayRollEntryRoute implements Routes {
    public path = '/api/pay-roll-entry';
    public router = Router();
    public payRollEntryController = new PayRollEntryController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.payRollEntryController.findAll);
        this.router.get(`${this.path}/:id`, this.payRollEntryController.findById);
        this.router.post(`${this.path}`, validationMiddleware(CreatePayrollDto, 'body'), this.payRollEntryController.create);
        // this.router.patch(`${this.path}`, validationMiddleware(DTO, 'body'), this.payRollEntryController.createIncentive);
    }
  }
  export default PayRollEntryRoute;