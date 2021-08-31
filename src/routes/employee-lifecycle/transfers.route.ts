/* eslint-disable prettier/prettier */
import { CreateTransferDto } from '../../dtos/employee-lifecycle/transfer.dto';
import TransferController from '@/controllers/employee-lifecycle/transfer.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware'

class TransferRoute implements Routes {
    public path = '/api/transfer';
    public router = Router();
    public transferController = new TransferController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,[authMiddleware], this.transferController.findAll);
        this.router.get(`${this.path}/:id`,[authMiddleware], this.transferController.findById);
        this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreateTransferDto, 'body')], this.transferController.create);
    }
  }
  export default TransferRoute;