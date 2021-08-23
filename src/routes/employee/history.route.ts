import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateHistoryDto, UpdateHistoryDto } from '@/dtos/employee/history.dto';
import HistoryController from '@/controllers/employee/history.controller';






class HistoryRoute implements Routes {
    public path = '/History';
    public router = Router();
    public HistoryController = new HistoryController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.HistoryController.getHistorys);
        this.router.get(`${this.path}/:id`, this.HistoryController.getHistoryById);
        this.router.post(`${this.path}`, validationMiddleware(CreateHistoryDto, 'body'), this.HistoryController.CreateHistory);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateHistoryDto, 'body', true), this.HistoryController.updateHistory);
        this.router.delete(`${this.path}/:id`, this.HistoryController.deleteHistory);
      }
    }

    export default HistoryRoute;
