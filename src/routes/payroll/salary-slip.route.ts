/* eslint-disable prettier/prettier */
import { CreateSalarySlipDto } from '../../dtos/payroll/salary-slip.dto';
import SalarySlipController from '@/controllers/payroll/salary-slip.controllers';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import permissionMiddleware from "@middlewares/permission.middleware";

class SalarySlipRoute implements Routes {
    public path = '/api/salary-slip';
    public router = Router();
    public salarySlipController = new SalarySlipController();

    constructor() {
      this.initializeRoutes();
    }

    //remember to add auths!
    private initializeRoutes() {
        this.router.get(`${this.path}`,[authMiddleware, permissionMiddleware('HR')], this.salarySlipController.findAll);
        this.router.get(`${this.path}/employee-report`, [authMiddleware, permissionMiddleware('HR')], this.salarySlipController.findById);
        this.router.post(`${this.path}`, [authMiddleware, permissionMiddleware('HR')], this.salarySlipController.create);
        this.router.post(`${this.path}/approve/batch`, [authMiddleware], this.salarySlipController.approveAndPay);
        this.router.post(`${this.path}/generate`, [authMiddleware], this.salarySlipController.createDepartmentPayroll);
    }
  }
  export default SalarySlipRoute;
