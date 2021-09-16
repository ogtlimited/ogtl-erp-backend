/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateExitDto, UpdateExitDto } from '@/dtos/employee/exit.dto';
import ExitController from '@/controllers/employee/exit.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class ExitRoute implements Routes {
  public path = '/Exit';
  public router = Router();
  public ExitController = new ExitController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.ExitController.getExits);
    this.router.get(`${this.path}/:id`, authMiddleware, this.ExitController.getExitById);
    this.router.post(`${this.path}`, [validationMiddleware(CreateExitDto, 'body'), authMiddleware], this.ExitController.CreateExit);
    this.router.put(`${this.path}/:id`, [validationMiddleware(UpdateExitDto, 'body', true), authMiddleware], this.ExitController.updateExit);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.ExitController.deleteExit);
  }
}

export default ExitRoute;
