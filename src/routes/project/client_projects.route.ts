/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateClientDto, UpdateClientDto } from '@dtos/project/client.dto';
import ClientController from '@/controllers/project/client.controller';


class ClientProjectsRoute implements Routes {
  public path = '/api/client_projects';
  public router = Router();
  public client = new ClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:clientId`, this.client.getClientProjects);
  }
}

export default ClientProjectsRoute;
