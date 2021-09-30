/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import {CreateDepartmentDto, UpdateDepartmentDto} from '@dtos/employee/department.dto';
import DepartmentController from '@/controllers/employee/department.controller';
import authMiddleware from '@/middlewares/auth.middleware';


class DepartmentRoute implements Routes {
    public path = '/department';
    public router = Router();
    public DepartmentController = new DepartmentController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.DepartmentController.getDepartments);
        this.router.get(`${this.path}/:id`,authMiddleware, this.DepartmentController.getDepartmentById);
        this.router.post(`${this.path}`, authMiddleware,validationMiddleware(CreateDepartmentDto, 'body'), this.DepartmentController.CreateDepartment);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateDepartmentDto, 'body', true), this.DepartmentController.updateDepartment);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.DepartmentController.deleteDepartment);
      }
    }

    export default DepartmentRoute;
