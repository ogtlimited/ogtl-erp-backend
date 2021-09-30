/* eslint-disable prettier/prettier */
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import MaintenanceReportController from '@controllers/maintenance-report/maintenance_report.controller';
import {
  CreateMaintenanceReportDto,
  UpdateMaintenanceReportDto,
} from '@dtos/maintenance-report/maintenance_report.dto';

class MaintenanceReportRoute implements Routes{
  public path = '/api/maintenanceReport';
  public router = Router();
  public MaintenanceReportController = new MaintenanceReportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware,this.MaintenanceReportController.getMaintenanceReports);
    this.router.get(`${this.path}/:id`, authMiddleware,this.MaintenanceReportController.getMaintenanceReportById);
    this.router.post(`${this.path}`, [validationMiddleware(CreateMaintenanceReportDto, 'body'),authMiddleware], this.MaintenanceReportController.createMaintenanceReport);
    this.router.patch(`${this.path}/:id`,[ validationMiddleware(UpdateMaintenanceReportDto, 'body', true),authMiddleware], this.MaintenanceReportController.updateMaintenanceReport);
    this.router.delete(`${this.path}/:id`, authMiddleware,this.MaintenanceReportController.deleteMaintenanceReport);
  }
}

export default MaintenanceReportRoute;
