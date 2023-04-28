/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { CreateEmployeeDto, CreateMultipleEmployeeDto, UpdateEmployeeRoleDto, UpdateEmployeeDto } from '@dtos/employee/employee.dto';

import { Routes } from '@interfaces/routes.interface';
import EmployeesController from '@/controllers/employee/employee.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class LeadsSubordinatesRoute implements Routes {
    public path = '/leads';
    public router = Router();
    public employeesController = new EmployeesController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/subordinates`, authMiddleware, this.employeesController.getReporteesForLeads);
        }
}

export default LeadsSubordinatesRoute;
