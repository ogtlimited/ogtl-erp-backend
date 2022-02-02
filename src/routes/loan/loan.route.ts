/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
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
    this.router.get(`${this.path}`, authMiddleware, this.loan.getLoans);
    this.router.get(`${this.path}/:loanId`, authMiddleware, this.loan.getLoan);
    this.router.post(`${this.path}`, [validationMiddleware(LoanDto, 'body')], this.loan.createLoan);
    this.router.put(`${this.path}/:loanId`, authMiddleware, validationMiddleware(PutLoanDto, 'body'), this.loan.updateLoan);
    this.router.delete(`${this.path}/:loanId`, authMiddleware, this.loan.deleteLoan);
  }
}

export default LoanRoute;
