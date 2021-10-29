/* eslint-disable prettier/prettier */
import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}combine-employee-form`, this.indexController.createEmployeeFormSelection);
    this.router.get(`${this.path}admin-dashboard`, this.indexController.getAdminDashboardData);
    this.router.get(`${this.path}profile-dashboard/:id`, this.indexController.getEmployeeFUllData);
    this.router.get(`${this.path}accounts-dashboard`, this.indexController.getAccountsDashboard);

  }
}

export default IndexRoute;
