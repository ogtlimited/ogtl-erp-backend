/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import OfficeController from '@/controllers/employee/office.controller';
import authMiddleware from '@/middlewares/auth.middleware';


class OfficeRoute implements Routes {
    public path = '/office';
    public router = Router();
    public OfficeController = new OfficeController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, this.OfficeController.createOffice);
      }
    }

export default OfficeRoute;
