/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { ClientAccountDto } from '@/dtos/project/client_account.dto';
import ClientAccountController from '@/controllers/project/client_account.controller';
import authMiddleware from '@middlewares/auth.middleware';
import permissionMiddleware from "@middlewares/permission.middleware";

class ClientAccountRoute implements Routes {
  public path = '/api/client-accounts';
  public router = Router();
  public clientAccount = new ClientAccountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path,[authMiddleware, permissionMiddleware('HR')], this.clientAccount.getAllClientsAccounts);
    this.router.get(`${this.path}/:clientId`, [authMiddleware,  permissionMiddleware('HR')], this.clientAccount.getClientAccount);
    this.router.post(`${this.path}`, [authMiddleware,  permissionMiddleware('HR'), validationMiddleware(ClientAccountDto, 'body')], this.clientAccount.createClientAccount);
  }
}

export default ClientAccountRoute;
