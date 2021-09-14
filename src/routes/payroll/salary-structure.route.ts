/* eslint-disable prettier/prettier */
import { CreateSalaryStructureDto, UpdateSalaryStructureDto } from '../../dtos/payroll/salary-structure.dto';
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
        this.router.get(`${this.path}`,[], this.salaryStrutureController.findAll);
        this.router.get(`${this.path}/:id`,[], this.salaryStrutureController.findById);
        this.router.post(`${this.path}`,[validationMiddleware(CreateSalaryStructureDto, 'body')], this.salaryStrutureController.create);
        this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateSalaryStructureDto, 'body')], this.salaryStrutureController.update);
    }
  }
  export default SalaryStructureRoute;