/* eslint-disable prettier/prettier */
 import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
 import SalarySettingController from '@controllers/payroll/salary-setting.controller';
import { CreateSalarySettingDto } from '@dtos/salary-settings/salary-settings.dto';

class SalarySettingRoute implements Routes {
  public path = '/api/salary-settings';
  public router = Router();
  public salarySettingsController = new SalarySettingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.salarySettingsController.findAll);
    this.router.post(`${this.path}`,[validationMiddleware(CreateSalarySettingDto, 'body')], this.salarySettingsController.createUpdateSalarySettings);
  }
}
export default SalarySettingRoute;
