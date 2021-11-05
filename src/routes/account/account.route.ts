/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { AccountDto, PutAccountDto } from '@dtos/account/account.dto';
import AccountController from '@/controllers/account/account.controller';


class AccountRoute implements Routes {
  public path = '/api/account';
  public router = Router();
  public account = new AccountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.account.getaccounts);
    this.router.get(`${this.path}/tree/all`, this.account.getTree);
    this.router.get(`${this.path}/:accountId`, authMiddleware, this.account.getaccount);
    this.router.get(`${this.path}/descendants/:accountId`, authMiddleware, this.account.getdescendants);
    this.router.put(`${this.path}/update-ancestory/:accountId`, authMiddleware, this.account.updateAncestory);
    this.router.post(`${this.path}`, [validationMiddleware(AccountDto, 'body'), authMiddleware], this.account.createaccount);
    this.router.patch(`${this.path}/:accountId`, authMiddleware, validationMiddleware(PutAccountDto, 'body'), this.account.updateaccount);
    this.router.delete(`${this.path}/:accountId`, authMiddleware, this.account.deleteaccount);
  }
}

export default AccountRoute;
