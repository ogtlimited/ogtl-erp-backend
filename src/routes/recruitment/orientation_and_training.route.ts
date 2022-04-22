/* eslint-disable prettier/prettier */
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import OrientationController from '@/controllers/recruitment/orientation_and_training.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateOrientationDto,UpdateOrientationDto } from '@/dtos/recruitment/orientation_and_training.dto';
import authMiddleware from '@middlewares/auth.middleware';

class OrientationRoute implements Routes {
  public path = '/api/orientation-and-training';
  public router = Router();
  public orientationController = new OrientationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.orientationController.getOrientations);
    this.router.get(`${this.path}/:id`, authMiddleware, this.orientationController.getOrientationById);
    this.router.post(`${this.path}`, [validationMiddleware(CreateOrientationDto, 'body'), authMiddleware], this.orientationController.createOrientation);
    this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateOrientationDto, 'body'), authMiddleware], this.orientationController.updateOrientation);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.orientationController.deleteOrientation);
  }
}

export default OrientationRoute;
