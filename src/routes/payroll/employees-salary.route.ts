/* eslint-disable prettier/prettier */
import EmployeeSalaryController from "@controllers/payroll/employees-salary.service";
import {CreateEmployeeSalaryDto} from "@dtos/payroll/employees-salary.dto";
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class EmployeesSalaryRoute implements Routes {
    public path = '/api/employees-salary';
    public router = Router();
    public EmployeeSalaryController = new EmployeeSalaryController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [authMiddleware], this.EmployeeSalaryController.findAll);
        this.router.get(`${this.path}/:id`,[authMiddleware], this.EmployeeSalaryController.findById);
        this.router.post(`${this.path}`,[authMiddleware], this.EmployeeSalaryController.create);
        this.router.patch(`${this.path}`, [authMiddleware, validationMiddleware(CreateEmployeeSalaryDto, 'body')], this.EmployeeSalaryController.updateEmployeeSalary);
    }
  }
  export default EmployeesSalaryRoute;
