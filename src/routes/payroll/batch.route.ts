/* eslint-disable prettier/prettier */
import BatchController from '@/controllers/payroll/batch.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class BatchRoute implements Routes {
    public path = '/api/batch';
    public router = Router();
    public BatchController = new BatchController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, [authMiddleware], this.BatchController.findBatchById);
    }
  }
  export default BatchRoute;
