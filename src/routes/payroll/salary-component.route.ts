/* eslint-disable prettier/prettier */
import { CreateSalaryComponentDto } from '../../dtos/payroll/salary-component.dto';
import SalaryComponentController from '@/controllers/payroll/salary-component.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class SalaryComponentRoute implements Routes {
    public path = '/api/salary-component';
    public router = Router();
    public salaryComponentController = new SalaryComponentController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [],this.salaryComponentController.findAll);
        this.router.get(`${this.path}/:id`,[], this.salaryComponentController.findById);
        this.router.post(`${this.path}`, [ validationMiddleware(CreateSalaryComponentDto, 'body')], this.salaryComponentController.create);
        // this.router.patch(`${this.path}`, validationMiddleware(DTO, 'body'), this.salaryComponentController.createIncentive);
    }
  }
  export default SalaryComponentRoute;