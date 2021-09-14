/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { TrainingResultDto, PutTrainingResultDto } from '@dtos/training/training-result.dto';
import TrainingResultController from '@/controllers/training/training-result.controller';


class TrainingResultRoute implements Routes {
  public path = '/api/training-result';
  public router = Router();
  public trainingResult = new TrainingResultController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.trainingResult.getTainingResults);
    this.router.get(`${this.path}/:trainingResultId`, authMiddleware, this.trainingResult.getTainingResult);
    this.router.post(`${this.path}`, [validationMiddleware(TrainingResultDto, 'body'), authMiddleware], this.trainingResult.createTrainingResult);
    this.router.put(`${this.path}/:trainingResultId`, [validationMiddleware(PutTrainingResultDto, 'body', true), authMiddleware], this.trainingResult.updateTrainingResult);
    this.router.delete(`${this.path}/:trainingResultId`, authMiddleware, this.trainingResult.deleteTrainingResult);
  }
}

export default TrainingResultRoute;