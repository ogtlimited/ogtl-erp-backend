/* eslint-disable prettier/prettier */
import { DTO } from '../../dtos';
import CONTROLLER from '@/controllers';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class EROUTE implements Routes {
    public path = '/api/{route}';
    public router = Router();
    public CONTROLLERINJECTION = new CONTROLLER();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.CONTROLLERINJECTION.findAll);
        this.router.get(`${this.path}/:id`, this.CONTROLLERINJECTION.findById);
        this.router.post(`${this.path}`, validationMiddleware(DTO, 'body'), this.CONTROLLERINJECTION.create);
    }
  }
  export default EROUTE;