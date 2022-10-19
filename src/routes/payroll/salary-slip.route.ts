/* eslint-disable prettier/prettier */
import { CreateSalarySlipDto } from '../../dtos/payroll/salary-slip.dto';
import SalarySlipController from '@/controllers/payroll/salary-slip.controllers';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import roleMiddleWare from "@middlewares/role.middleware";
import permissionMiddleware from "@middlewares/permission.middleware";

class SalarySlipRoute  {
    public path = '/api/salary-slip';
    public router = Router();
    public salarySlipController = new SalarySlipController();

    constructor() {
      this.initializeRoutes();
    }

    //remember to add auths!
    private initializeRoutes() {
        this.router.get(`${this.path}`,[authMiddleware, permissionMiddleware('HR'),roleMiddleWare("HR Manager")], this.salarySlipController.findAll);
        this.router.get(`${this.path}/employee-report`, [authMiddleware, permissionMiddleware('HR'),roleMiddleWare("HR Manager")], this.salarySlipController.findById);
        this.router.post(`${this.path}`, [authMiddleware, permissionMiddleware('HR'),roleMiddleWare("HR Manager")], this.salarySlipController.create);
        this.router.post(`${this.path}/approve/batch`, [authMiddleware, permissionMiddleware('HR'),roleMiddleWare("HR Manager")], this.salarySlipController.approveAndPay);
        this.router.post(`${this.path}/generate`, [authMiddleware, permissionMiddleware('HR'),roleMiddleWare("HR Manager") ], this.salarySlipController.createDepartmentPayroll);
    }
  }
  export default SalarySlipRoute;
