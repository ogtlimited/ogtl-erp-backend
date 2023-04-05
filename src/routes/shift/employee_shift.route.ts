/* eslint-disable prettier/prettier */
import EmployeeShiftController from '@/controllers/shift/employee_shift.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import { CreateEmployeeShiftDto, UpdateEmployeeShiftDto } from '@dtos/shift/employee_shift.dto';
import authMiddleware from '@middlewares/auth.middleware';
import permissionMiddleware from '@/middlewares/permission.middleware';


class EmployeeShiftRoute implements Routes {
    public path = '/api/employee-shift';
    public router = Router();
    public employeeShiftController = new EmployeeShiftController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.employeeShiftController.getEmployeesShifts);
        this.router.get(`${this.path}/office`, [authMiddleware, permissionMiddleware("HR")], this.employeeShiftController.getshiftTypeBasedOnOffice);
        // this.router.get(`${this.path}/:id`, authMiddleware, this.employeeShiftController.getEmployeeShiftById);
        this.router.get(`${this.path}/:ogid`, authMiddleware, this.employeeShiftController.getEmployeeShiftOGID);
        this.router.post(`${this.path}`, [authMiddleware], this.employeeShiftController.createExistingEmployeesShift);
        this.router.post(`${this.path}/from-csv`, [authMiddleware], this.employeeShiftController.createEmployeesShiftFromCsvFile);
        this.router.patch(`${this.path}`, [authMiddleware], this.employeeShiftController.updateEmployeesShift);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.employeeShiftController.deleteEmployeeShift);
    }
}
export default EmployeeShiftRoute;
