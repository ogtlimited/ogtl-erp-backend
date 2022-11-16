/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ClientAccountController from '@/controllers/project/client_account.controller';


class ClientAccountActivationRoute implements Routes {
  public path = '/api/client_status';
  public router = Router();
  public clientAccount = new ClientAccountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:clientAccountId`,this.clientAccount.activatingClientAccount);
  }
}

export default ClientAccountActivationRoute;
