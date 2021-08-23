import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateExitDto, UpdateExitDto } from '@/dtos/employee/exit.dto';
import ExitController from '@/controllers/employee/exit.controller';




class ExitRoute implements Routes {
    public path = '/Exit';
    public router = Router();
    public ExitController = new ExitController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.ExitController.getExits);
        this.router.get(`${this.path}/:id`, this.ExitController.getExitById);
        this.router.post(`${this.path}`, validationMiddleware(CreateExitDto, 'body'), this.ExitController.CreateExit);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateExitDto, 'body', true), this.ExitController.updateExit);
        this.router.delete(`${this.path}/:id`, this.ExitController.deleteExit);
      }
    }

    export default ExitRoute;