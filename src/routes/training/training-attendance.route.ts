/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { TrainingAttendanceDto, PutTrainingAttendanceDto } from '@dtos/training/training-attendance.dto';
import TrainingAttendanceController from '@/controllers/training/training-attendance.controller';


class TrainingAttendanceRoute implements Routes {
  public path = '/api/training-attendance';
  public router = Router();
  public trainingAttendance = new TrainingAttendanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.trainingAttendance.getTainingAttendances);
    this.router.get(`${this.path}/:trainingAttendanceId`, authMiddleware, this.trainingAttendance.getTainingAttendance);
    this.router.post(`${this.path}`, [validationMiddleware(TrainingAttendanceDto, 'body'), authMiddleware], this.trainingAttendance.createTrainingAttendance);
    this.router.put(`${this.path}/:trainingAttendanceId`, [validationMiddleware(PutTrainingAttendanceDto, 'body', true), authMiddleware], this.trainingAttendance.updateTrainingAttendance);
    this.router.delete(`${this.path}/:trainingAttendanceId`, authMiddleware, this.trainingAttendance.deleteTrainingAttendance);
  }
}

export default TrainingAttendanceRoute;