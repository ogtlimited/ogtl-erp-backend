import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import {CreateDesignationDto, UpdateDesignationDto} from '@dtos/employee/designation.dto';
import DesignationController from '@/controllers/employee/designation.controller';


class DesignationRoute implements Routes {
    public path = '/Designation';
    public router = Router();
    public DesignationController = new DesignationController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.DesignationController.getDesignations);
        this.router.get(`${this.path}/:id`, this.DesignationController.getDesignationById);
        this.router.post(`${this.path}`, validationMiddleware(CreateDesignationDto, 'body'), this.DesignationController.CreateDesignation);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateDesignationDto, 'body', true), this.DesignationController.updateDesignation);
        this.router.delete(`${this.path}/:id`, this.DesignationController.deleteDesignation);
      }
    }

    export default DesignationRoute;