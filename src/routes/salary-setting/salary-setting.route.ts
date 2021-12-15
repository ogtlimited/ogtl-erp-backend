/* eslint-disable prettier/prettier */
import {CreateSalarySettingDto, UpdateSalarySettingDto} from '@dtos/salary-settings/salary-settings.dto';
import SalarySettingController from '../../controllers/salary-settings/salary-setting.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import authMiddleware from '../../middlewares/auth.middleware';
import { Router } from 'express';

class SalarySettingRoute implements Routes {
  public path = '/api/salary-setting';
  public router = Router();
  public salarySettingController = new SalarySettingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,[authMiddleware], this.salarySettingController.findAll);
    this.router.get(`${this.path}/:id`,[authMiddleware], this.salarySettingController.findById);
    this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreateSalarySettingDto, 'body')], this.salarySettingController.create);
    this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(UpdateSalarySettingDto, 'body')], this.salarySettingController.update);
  }
}
export default SalarySettingRoute;
