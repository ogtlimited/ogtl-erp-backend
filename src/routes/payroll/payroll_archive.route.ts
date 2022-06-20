/* eslint-disable prettier/prettier */
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import PayRollArchiveController from "@controllers/payroll/payroll-archive.controller";

class PayRollArchiveRoute implements Routes {
  public path = '/api/payroll-archive';
  public router = Router();
  public payRollController = new PayRollArchiveController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [], this.payRollController.findAll);
    this.router.get(`${this.path}/:id`, [], this.payRollController.findById);
  }
}
export default PayRollArchiveRoute;
