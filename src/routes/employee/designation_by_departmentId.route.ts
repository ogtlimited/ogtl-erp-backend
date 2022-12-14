/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import DesignationController from '@/controllers/employee/designation.controller';
import authMiddleware from '@/middlewares/auth.middleware';


class DesignationByDepartmentRoute implements Routes {
    public path = '/designation-by-departmentId';
    public router = Router();
    public DesignationController = new DesignationController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:department_id`,authMiddleware, this.DesignationController.getDesignationByDepartmentId);
      }
    }

    export default DesignationByDepartmentRoute;