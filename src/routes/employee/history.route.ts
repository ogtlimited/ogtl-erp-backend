import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateHistoryDto, UpdateHistoryDto } from '@/dtos/employee/history.dto';
import HistoryController from '@/controllers/employee/history.controller';
import authMiddleware from '@/middlewares/auth.middleware';






class HistoryRoute implements Routes {
    public path = '/History';
    public router = Router();
    public HistoryController = new HistoryController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.HistoryController.getHistorys);
        this.router.get(`${this.path}/:id`,authMiddleware, this.HistoryController.getHistoryById);
        this.router.post(`${this.path}`,authMiddleware, validationMiddleware(CreateHistoryDto, 'body'), this.HistoryController.CreateHistory);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateHistoryDto, 'body', true), this.HistoryController.updateHistory);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.HistoryController.deleteHistory);
      }
    }

    export default HistoryRoute;
