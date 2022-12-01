/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { CreateEmployeeDto, CreateMultipleEmployeeDto, UpdateEmployeeRoleDto, UpdateEmployeeDto } from '@dtos/employee/employee.dto';

import { Routes } from '@interfaces/routes.interface';
import EmployeesController from '@/controllers/employee/employee.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class DepartmentEmployeesRoute implements Routes {
  public path = '/departments/employees';
  public router = Router();
  public employeesController = new EmployeesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {  
    this.router.get(`${this.path}/count`, authMiddleware, this.employeesController.countEmployeesByDepartment);
    this.router.get(`${this.path}/designations/:department_id`, authMiddleware, this.employeesController.getDesignationsByDepartment);
    this.router.get(`${this.path}/:department_id`, authMiddleware, this.employeesController.getEmployeesByDepartment);
    
  }
}

export default DepartmentEmployeesRoute;
