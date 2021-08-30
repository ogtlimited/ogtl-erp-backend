/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { LoanDto, PutLoanDto } from '@dtos/loan/loan.dto';
import LoanController from '@/controllers/loan/loan.controller';


class LoanRoute implements Routes {
  public path = '/api/loan';
  public router = Router();
  public loan = new LoanController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.loan.getLoans);
    this.router.get(`${this.path}/:loanId`, this.loan.getLoan);
    this.router.post(`${this.path}`, validationMiddleware(LoanDto, 'body'), this.loan.createLoan);
    this.router.put(`${this.path}/:loanId`, validationMiddleware(PutLoanDto, 'body'), this.loan.updateLoan);
    this.router.delete(`${this.path}/:loanId`, this.loan.deleteLoan);
  }
}

export default LoanRoute;
