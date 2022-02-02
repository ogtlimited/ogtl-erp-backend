/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateSalaryDetailsDto, UpdateSalaryDetailsDto } from '@/dtos/employee/salary-details.dto';
import SalaryDetailsController from '@/controllers/employee/salary-details.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class SalaryDetailsRoute implements Routes {
  public path = '/SalaryDetails';
  public router = Router();
  public SalaryDetailsController = new SalaryDetailsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.SalaryDetailsController.getSalaryDetails);
    this.router.get(`${this.path}/:id`, authMiddleware, this.SalaryDetailsController.getSalaryDetailsById);
    this.router.post(
      `${this.path}`,
      [validationMiddleware(CreateSalaryDetailsDto, 'body'), authMiddleware],
      this.SalaryDetailsController.CreateSalaryDetails,
    );
    this.router.post(
      `${this.path}/bulk-upload`,
      [authMiddleware],
      this.SalaryDetailsController.CreateBulkCreateSalaryDetails,
    );
    this.router.put(
      `${this.path}/:id`,
      [validationMiddleware(UpdateSalaryDetailsDto, 'body', true), authMiddleware],
      this.SalaryDetailsController.updateSalaryDetails,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.SalaryDetailsController.deleteSalaryDetails);
  }
}

export default SalaryDetailsRoute;
