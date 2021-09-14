/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { LoanApplicationDto, PutDto, ApprovalDto } from '@dtos/loan/loan-application.dto';
import LoanApplicationController from '@/controllers/loan/loan-application.controller';


class LoanApplicationRoute implements Routes {
  public path = '/api/loan-application';
  public router = Router();
  public loanApplication = new LoanApplicationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.loanApplication.getLoanApplications);
    this.router.get(`${this.path}/:loanApplicationId`, authMiddleware, this.loanApplication.getLoanApplication);
    this.router.post(`${this.path}`, [validationMiddleware(LoanApplicationDto, 'body'), authMiddleware], this.loanApplication.createLoanApplication);
    this.router.put(`${this.path}/:loanApplicationId`, [validationMiddleware(PutDto, 'body', true), authMiddleware], this.loanApplication.updateLoanApplication);
    this.router.put(`${this.path}/status/:loanApplicationId`, [validationMiddleware(ApprovalDto, 'body', true), authMiddleware], this.loanApplication.approveLoanApplication);
    this.router.delete(`${this.path}/:loanApplicationId`, authMiddleware, this.loanApplication.deleteLoanApplication);
  }
}

export default LoanApplicationRoute;