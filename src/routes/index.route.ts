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
    this.router.get(`${this.path}create-employee-form`, this.indexController.createEmployeeForm);
    this.router.get(`${this.path}create-shift-form`, this.indexController.createShiftForm);
    this.router.get(`${this.path}create-payroll-form`, this.indexController.createPayrollForm);
    this.router.get(`${this.path}create-recruitment-form`, this.indexController.createRecruitmentForm);
    this.router.get(`${this.path}create-performance-form`, this.indexController.createPerformanceForm);
    this.router.get(`${this.path}create-campaign-form`, this.indexController.createCampaignForm);
    this.router.get(`${this.path}create-role-form`, this.indexController.createRoleAssignmentForm);
    this.router.get(`${this.path}admin-dashboard`, this.indexController.getAdminDashboardData);
    this.router.get(`${this.path}profile-dashboard/:id`, this.indexController.getEmployeeFUllData);
    this.router.get(`${this.path}accounts-dashboard`, this.indexController.getAccountsDashboard);
    this.router.get(`${this.path}job-dashboard`, this.indexController.jobDashboard);

  }
}

export default IndexRoute;
