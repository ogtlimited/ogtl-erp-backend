/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { TrainingProgramDto, PutTrainingProgramDto } from '@dtos/training/training-program.dto';
import TrainingProgramController from '@/controllers/training/training-program.controller';


class TrainingProgramRoute implements Routes {
  public path = '/api/training-program';
  public router = Router();
  public trainingProgram = new TrainingProgramController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.trainingProgram.getTainingPrograms);
    this.router.get(`${this.path}/:trainingProgramId`, authMiddleware, this.trainingProgram.getTainingProgram);
    this.router.post(`${this.path}`, [validationMiddleware(TrainingProgramDto, 'body'), authMiddleware], this.trainingProgram.createTrainingProgram);
    this.router.put(`${this.path}/:trainingProgramId`, [validationMiddleware(PutTrainingProgramDto, 'body', true), authMiddleware], this.trainingProgram.updateTrainingProgram);
    this.router.delete(`${this.path}/:trainingProgramId`, authMiddleware, this.trainingProgram.deleteTrainingProgram);
  }
}

export default TrainingProgramRoute;