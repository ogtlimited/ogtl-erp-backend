/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ClientController from '@/controllers/project/client.controller';
import authMiddleware from '@middlewares/auth.middleware';
import permissionMiddleware from "@middlewares/permission.middleware";



class ClientProjectsRoute implements Routes {
  public path = '/api/client_projects';
  public router = Router();
  public client = new ClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:clientId`, [authMiddleware], this.client.getClientProjects);
  }
}

export default ClientProjectsRoute;
