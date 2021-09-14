import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import { CreateEducationDto, UpdateEducationDto } from '@/dtos/employee/education.dto';

import EducationController from '@/controllers/employee/education.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class EducationRoute implements Routes {
  public path = '/Education';
  public router = Router();
  public EducationController = new EducationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.EducationController.getEducation);
    this.router.get(`${this.path}/:id`, authMiddleware, this.EducationController.getEducationsById);
    this.router.post(`${this.path}`, [validationMiddleware(CreateEducationDto, 'body'), authMiddleware], this.EducationController.CreateEducation);
    this.router.put(
      `${this.path}/:id`,
      [validationMiddleware(UpdateEducationDto, 'body', true), authMiddleware],
      this.EducationController.updateEducation,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.EducationController.deleteEducation);
  }
}

export default EducationRoute;
