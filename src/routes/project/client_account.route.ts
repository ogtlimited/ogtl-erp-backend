/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { ClientAccountDto } from '@/dtos/project/client_account.dto';
import ClientAccountController from '@/controllers/project/client_account.controller';


class ClientAccountRoute implements Routes {
  public path = '/api/client_account';
  public router = Router();
  public clientAccount = new ClientAccountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,this.clientAccount.getAllClientsAccounts);
    this.router.get(`${this.path}/:clientAccountId`, this.clientAccount.getClientAccount);
    this.router.post(`${this.path}`, validationMiddleware(ClientAccountDto, 'body'), this.clientAccount.createClientAccount);
    this.router.patch(`${this.path}/:clientAccountId`, validationMiddleware(ClientAccountDto, 'body'), this.clientAccount.updateClientAccount);
    this.router.patch(`${this.path}/:clientAccountId`, validationMiddleware(ClientAccountDto, 'body'), this.clientAccount.updateClientAccount);
    this.router.delete(`${this.path}/:clientAccountId`, this.clientAccount.deleteClientAccount);
  }
}

export default ClientAccountRoute;
