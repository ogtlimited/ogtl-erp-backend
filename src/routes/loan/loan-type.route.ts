/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { LoanTypeDto } from '@dtos/loan/loan-type.dto';
import LoanTypeController from '@/controllers/loan/loan-type.controller';


class LoanTypeRoute implements Routes {
  public path = '/api/loan-type';
  public router = Router();
  public loanType = new LoanTypeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.loanType.getLoanTypes);
    this.router.get(`${this.path}/:loanTypeId`, this.loanType.getLoanType);
    this.router.post(`${this.path}`, validationMiddleware(LoanTypeDto, 'body'), this.loanType.createLoanType);
    this.router.delete(`${this.path}/:loanTypeId`, this.loanType.deleteLoanType);
  }
}

export default LoanTypeRoute;