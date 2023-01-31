/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import EmployeeVerificationController from '@/controllers/employee/employee_verification.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class EmployeeVerificationRoute implements Routes {
  public path = '/employee-verification';
  public router = Router();
  public employeeVerificationController = new EmployeeVerificationController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/:ogid`, this.employeeVerificationController.findEmployeeByOgId);
  }
}
export default EmployeeVerificationRoute;
