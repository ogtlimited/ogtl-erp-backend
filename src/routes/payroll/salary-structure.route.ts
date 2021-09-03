/* eslint-disable prettier/prettier */
import { CreateSalaryStructureDto } from '../../dtos/payroll/salary-structure.dto';
import SalaryStrutureController from '@/controllers/payroll/salary-structure.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class SalaryStructureRoute implements Routes {
    public path = '/api/salary-structure';
    public router = Router();
    public salaryStrutureController = new SalaryStrutureController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,[authMiddleware], this.salaryStrutureController.findAll);
        this.router.get(`${this.path}/:id`,[authMiddleware], this.salaryStrutureController.findById);
        this.router.post(`${this.path}`,[authMiddleware, validationMiddleware(CreateSalaryStructureDto, 'body')], this.salaryStrutureController.create);
        // this.router.patch(`${this.path}`, validationMiddleware(CreateSalaryStructureDto, 'body'), this.CONTROLLER.createIncentive);
    }
  }
  export default SalaryStructureRoute;