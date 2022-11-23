/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { ResetClientAccountPasswordDto } from '@/dtos/project/client_account.dto';
import ClientAccountController from '@/controllers/project/client_account.controller';
import authMiddleware from '@middlewares/auth.middleware';
import permissionMiddleware from "@middlewares/permission.middleware";


class ResetDefaultClientAccountPasswordRoute implements Routes {
  public path = '/api/reset-password/client-account';
  public router = Router();
  public clientAccount = new ClientAccountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`,[authMiddleware, validationMiddleware(ResetClientAccountPasswordDto, 'body')], this.clientAccount.resetDefaultClientAccountPasssword);
  }
}

export default ResetDefaultClientAccountPasswordRoute;
