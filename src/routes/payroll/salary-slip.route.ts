/* eslint-disable prettier/prettier */
import { CreateSalarySlipDto } from '../../dtos/payroll/salary-slip.dto';
import SalarySlipController from '@/controllers/payroll/salary-slip.controllers';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class SalarySlipRoute implements Routes {
    public path = '/api/salary-slip';
    public router = Router();
    public salarySlipController = new SalarySlipController();

    constructor() {
      this.initializeRoutes();
    }

    //remember to add auths!
    private initializeRoutes() {
        this.router.get(`${this.path}`,[], this.salarySlipController.findAll);
        this.router.get(`${this.path}/employee-report`, [], this.salarySlipController.findById);
        this.router.post(`${this.path}`, [], this.salarySlipController.create);
        this.router.post(`${this.path}/generate`, [], this.salarySlipController.createDepartmentPayroll);
    }
  }
  export default SalarySlipRoute;
