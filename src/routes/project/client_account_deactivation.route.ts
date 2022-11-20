/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ClientAccountController from '@/controllers/project/client_account.controller';
import authMiddleware from '@middlewares/auth.middleware';
import permissionMiddleware from "@middlewares/permission.middleware";

class ClientAccountDeactivationRoute implements Routes {
  public path = '/api/deactivate/client-account';
  public router = Router();
  public clientAccount = new ClientAccountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.patch(`${this.path}/:clientAccountId`,[authMiddleware], this.clientAccount.deactivateClientAccount);
  }
}

export default ClientAccountDeactivationRoute;
