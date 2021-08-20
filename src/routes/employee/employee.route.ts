/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { CreateEmployeeDto } from '@dtos/employee/employee.dto';

import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import EmployeesController from '@/controllers/employee/employee.controller';

class EmployeesRoute implements Routes {
  public path = '/employees';
  public router = Router();
  public employeesController = new EmployeesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.employeesController.getEmployees);
    this.router.get(`${this.path}/:id`, this.employeesController.getEmployeeById);
    this.router.post(`${this.path}`, validationMiddleware(CreateEmployeeDto, 'body'), this.employeesController.createEmployee);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateEmployeeDto, 'body', true), this.employeesController.updateEmployee);
    this.router.delete(`${this.path}/:id`, this.employeesController.deleteEmployee);
  }
}

export default EmployeesRoute;
