/* eslint-disable prettier/prettier */
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import MaintenanceAndRepairsController from '@controllers/maintenance-report/maintenance_repairs.controller';
import {
  CreateMaintenanceAndRepairDto,
  UpdateMaintenanceAndRepairDto, UpdateMaintenanceStatus,
} from '@dtos/maintenance-report/maintenance_repairs.dto';


class MaintenanceAndRepairsRoute implements Routes{
  public path = '/api/maintenanceAndRepairs';
  public router = Router();
  public MaintenanceAndRepairsController = new MaintenanceAndRepairsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware,this.MaintenanceAndRepairsController.getMaintenanceAndRepairs);
    this.router.get(`${this.path}/:id`, authMiddleware,this.MaintenanceAndRepairsController.getMaintenanceAndRepairsById);
    this.router.post(`${this.path}`, [validationMiddleware(CreateMaintenanceAndRepairDto, 'body'),authMiddleware], this.MaintenanceAndRepairsController.createMaintenanceAndRepairs);
    this.router.patch(`${this.path}/:id`,[ validationMiddleware(UpdateMaintenanceAndRepairDto, 'body', true),authMiddleware], this.MaintenanceAndRepairsController.updateMaintenanceAndRepairs);
    this.router.patch(`${this.path}/status/:id`,[ validationMiddleware(UpdateMaintenanceStatus, 'body', true),authMiddleware], this.MaintenanceAndRepairsController.updateMaintenanceAndRepairsStatus);

    this.router.delete(`${this.path}/:id`, authMiddleware,this.MaintenanceAndRepairsController.deleteMaintenanceAndRepairs);
  }
}

export default MaintenanceAndRepairsRoute;
