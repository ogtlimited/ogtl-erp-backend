/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { TrainingEventDto, PutTrainingEventDto } from '@dtos/training/training-event.dto';
import TrainingEventController from '@/controllers/training/training-event.controller';


class TrainingEventRoute implements Routes {
  public path = '/api/training-event';
  public router = Router();
  public trainingEvent = new TrainingEventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.trainingEvent.getTainingEvents);
    this.router.get(`${this.path}/:trainingEventId`, authMiddleware, this.trainingEvent.getTainingEvent);
    this.router.post(`${this.path}`, [validationMiddleware(TrainingEventDto, 'body'), authMiddleware], this.trainingEvent.createTrainingEvent);
    this.router.put(`${this.path}/:trainingEventId`, [validationMiddleware(PutTrainingEventDto, 'body', true), authMiddleware], this.trainingEvent.updateTrainingEvent);
    this.router.delete(`${this.path}/:trainingEventId`, authMiddleware, this.trainingEvent.deleteTrainingEvent);
  }
}

export default TrainingEventRoute;