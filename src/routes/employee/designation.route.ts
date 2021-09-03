/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import {CreateDesignationDto, UpdateDesignationDto} from '@dtos/employee/designation.dto';
import DesignationController from '@/controllers/employee/designation.controller';
import authMiddleware from '@/middlewares/auth.middleware';


class DesignationRoute implements Routes {
    public path = '/designation';
    public router = Router();
    public DesignationController = new DesignationController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.DesignationController.getDesignations);
        this.router.get(`${this.path}/:id`,authMiddleware, this.DesignationController.getDesignationById);
        this.router.post(`${this.path}`, authMiddleware,validationMiddleware(CreateDesignationDto, 'body'), this.DesignationController.CreateDesignation);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateDesignationDto, 'body', true), this.DesignationController.updateDesignation);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.DesignationController.deleteDesignation);
      }
    }

    export default DesignationRoute;