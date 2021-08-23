import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import { CreateEducationDto, UpdateEducationDto } from '@/dtos/employee/education.dto';

import EducationController from '@/controllers/employee/education.controller';


class EducationRoute implements Routes {
    public path = '/Education';
    public router = Router();
    public EducationController = new EducationController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.EducationController.getEducation);
        this.router.get(`${this.path}/:id`, this.EducationController.getEducationsById);
        this.router.post(`${this.path}`, validationMiddleware(CreateEducationDto, 'body'), this.EducationController.CreateEducation);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateEducationDto, 'body', true), this.EducationController.updateEducation);
        this.router.delete(`${this.path}/:id`, this.EducationController.deleteEducation);
      }
    }

    export default EducationRoute;