/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateEmployeeTypeDto, UpdateEmployeeTypeDto } from '@/dtos/employee/employee-type.dto';

import EmployeeTypeController from '@/controllers/employee/employee-type.controller';
import authMiddleware from '@/middlewares/auth.middleware';




class EmployeeTypeRoute implements Routes {
    public path = '/EmployeeType';
    public router = Router();
    public EmployeeTypeController = new EmployeeTypeController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.EmployeeTypeController.getEmployeeType);
        this.router.get(`${this.path}/:id`, authMiddleware,this.EmployeeTypeController.getEmployeeTypeById);
        this.router.post(`${this.path}`,authMiddleware, validationMiddleware(CreateEmployeeTypeDto, 'body'), this.EmployeeTypeController.CreateEmployeeType);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateEmployeeTypeDto, 'body', true), this.EmployeeTypeController.updateEmployeeType);
        this.router.delete(`${this.path}/:id`, authMiddleware,this.EmployeeTypeController.deleteEmployeeType);
      }
    }

    export default EmployeeTypeRoute;