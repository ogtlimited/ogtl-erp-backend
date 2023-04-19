/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import OfficeController from '@/controllers/employee/office.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import permissionMiddleware from '@/middlewares/permission.middleware';


class OfficeRoute implements Routes {
    public path = '/office';
    public router = Router();
    public OfficeController = new OfficeController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}/employees`, [authMiddleware, permissionMiddleware('HR')], this.OfficeController.findEmployeesByOffice);
        this.router.post(`${this.path}`, [authMiddleware, permissionMiddleware('HR')], this.OfficeController.createOffice);
    }
}
export default OfficeRoute;
