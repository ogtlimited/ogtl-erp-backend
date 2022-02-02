/* eslint-disable prettier/prettier */
import { CreateExpenseHeadDraftDto, UpdateExpenseHeadDraftDto } from '../../dtos/expense-head-draft/expense-head-draft.dto';
import ExpenseHeadDraftController from '../../controllers/expense-head-draft/expense-head-draft.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class ExpenseHeadDraftRoute implements Routes {
  public path = '/api/expense-head-draft';
  public router = Router();
  public expenseHeadDraftController = new ExpenseHeadDraftController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [authMiddleware], this.expenseHeadDraftController.findAll);
    this.router.get(`${this.path}/:id`, [authMiddleware], this.expenseHeadDraftController.findById);
    this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreateExpenseHeadDraftDto, 'body')], this.expenseHeadDraftController.create);
    // this.router.patch(`${this.path}/approve/:id`, [authMiddleware], this.expenseHeadDraftController.approve);
    this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreateExpenseHeadDraftDto, 'body')], this.expenseHeadDraftController.update);
  }
}
export default ExpenseHeadDraftRoute;
