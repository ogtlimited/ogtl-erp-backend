/* eslint-disable prettier/prettier */
import { CreateDeductionTypeDto } from '../../dtos/payroll/deductionType.dto';
import DeductionTypeController from '@/controllers/payroll/deductionType.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class DeductionTypeRoute implements Routes {
    public path = '/api/deductionType';
    public router = Router();
    public deductionTypeController = new DeductionTypeController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.deductionTypeController.findAll);
        this.router.get(`${this.path}/:id`, this.deductionTypeController.findById);
        this.router.post(`${this.path}`, validationMiddleware(CreateDeductionTypeDto, 'body'), this.deductionTypeController.create);
        // this.router.patch(`${this.path}`, validationMiddleware(DTO, 'body'), this.deductionTypeController.createIncentive);
    }
  }
  export default DeductionTypeRoute;