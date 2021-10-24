/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateClientDto, UpdateClientDto } from '@dtos/project/client.dto';
import ClientController from '@/controllers/project/client.controller';


class ClientRoute implements Routes {
  public path = '/api/client';
  public router = Router();
  public client = new ClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.client.getClients);
    this.router.get(`${this.path}/:clientId`, this.client.getClient);
    this.router.post(`${this.path}`, validationMiddleware(CreateClientDto, 'body'), this.client.createClient);
    this.router.patch(`${this.path}/:clientId`, validationMiddleware(UpdateClientDto, 'body'), this.client.updateClient);
    this.router.delete(`${this.path}/:clientId`, this.client.deleteClient);
  }
}

export default ClientRoute;
