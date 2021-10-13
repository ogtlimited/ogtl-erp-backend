/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { AccountTypeDto, PutAccountTypeDto } from '@dtos/account/account-type.dto';
import AccountTypeController from '@/controllers/account/account-type.controller';


class AccountTypeRoute implements Routes {
  public path = '/api/account-type';
  public router = Router();
  public accountType = new AccountTypeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.accountType.getAccountTypes);
    this.router.get(`${this.path}/:accountTypeId`, authMiddleware, this.accountType.getAccountType);
    this.router.post(`${this.path}`, [validationMiddleware(AccountTypeDto, 'body'), authMiddleware], this.accountType.createAccountType);
    this.router.put(`${this.path}/:accountTypeId`, authMiddleware, validationMiddleware(PutAccountTypeDto, 'body'), this.accountType.updateAccountType);
    this.router.delete(`${this.path}/:accountTypeId`, authMiddleware, this.accountType.deleteAccountType);
  }
}

export default AccountTypeRoute;
