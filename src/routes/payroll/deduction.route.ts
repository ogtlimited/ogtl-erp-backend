/* eslint-disable prettier/prettier */
import { CreateDeductionDto } from '../../dtos/payroll/deduction.dto';
import DeductionController from '@/controllers/payroll/deduction.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class DeductionRoute implements Routes {
    public path = '/api/deduction';
    public router = Router();
    public deductionController = new DeductionController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.deductionController.findAll);
        this.router.get(`${this.path}/:id`, this.deductionController.findById);
        this.router.post(`${this.path}`, validationMiddleware(CreateDeductionDto, 'body'), this.deductionController.create);
        // this.router.patch(`${this.path}`, validationMiddleware(DTO, 'body'), this.deductionController.createIncentive);
    }
  }
  export default DeductionRoute;