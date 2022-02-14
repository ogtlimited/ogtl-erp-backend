/* eslint-disable prettier/prettier */
import { CreateTerminationDto, UpdateTerminationDto } from '../../dtos/employee-lifecycle/termination.dto';
import TerminationController from '@/controllers/employee-lifecycle/termination.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class TerminationRoute implements Routes {
    public path = '/api/termination';
    public router = Router();
    public TerminationController = new TerminationController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
      this.router.get(`${this.path}`, authMiddleware, this.TerminationController.findAllTerminations);
      this.router.get(`${this.path}/employee/get-by-month`, this.TerminationController.findAllTerminations);
      this.router.get(`${this.path}/:id`, authMiddleware, this.TerminationController.findTerminationById);
      this.router.post(`${this.path}`, [ validationMiddleware(CreateTerminationDto, 'body'),authMiddleware,], this.TerminationController.createTermination);
      this.router.put(`${this.path}/:id`, [validationMiddleware(UpdateTerminationDto, 'body'),authMiddleware,], this.TerminationController.updateTermination);
      this.router.delete(`${this.path}/:id`,authMiddleware, this.TerminationController.deleteTermination);
    }
  }
  export default TerminationRoute;