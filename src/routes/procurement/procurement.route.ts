/* eslint-disable prettier/prettier */
import { CreateProcurementDto, UpdateProcurementDto} from '../../dtos/procurement/procurement.dto';
import ProcurementController from '@/controllers/procurement/procurement.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class ProcurementRoute implements Routes {
    public path = '/api/procurement';
    public router = Router();
    public ProcurementController = new ProcurementController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [authMiddleware], this.ProcurementController.findAll);
        this.router.get(`${this.path}/:id`, [authMiddleware], this.ProcurementController.findById);
        this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreateProcurementDto, 'body')], this.ProcurementController.create);
        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(UpdateProcurementDto, 'body')], this.ProcurementController.update);
        this.router.patch(`${this.path}/approve/:id`, [authMiddleware], this.ProcurementController.approve);
    }
  }
  export default ProcurementRoute;