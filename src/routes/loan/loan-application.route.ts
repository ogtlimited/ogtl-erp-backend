/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { LoanApplicationDto } from '@dtos/loan/loan-application.dto';
import LoanApplicationController from '@/controllers/loan/loan-application.controller';


class LoanApplicationRoute implements Routes {
  public path = '/api/loan-application';
  public router = Router();
  public loanApplication = new LoanApplicationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.loanApplication.getLoanApplications);
    this.router.get(`${this.path}/:loanApplicationId`, this.loanApplication.getLoanApplication);
    this.router.post(`${this.path}`, validationMiddleware(LoanApplicationDto, 'body'), this.loanApplication.createLoanApplication);
    this.router.delete(`${this.path}/:loanApplicationId`, this.loanApplication.deleteLoanApplication);
  }
}

export default LoanApplicationRoute;