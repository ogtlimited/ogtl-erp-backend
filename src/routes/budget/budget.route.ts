/* eslint-disable prettier/prettier */
import { CreateBudgetDto, IncreaseBudgetDto } from '../../dtos/budget/budget.dto';
import BudgetController from '@/controllers/budget/budget.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class BudgetRoute implements Routes {
    public path = '/api/budget';
    public router = Router();
    public budgetController = new BudgetController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [authMiddleware], this.budgetController.findAll);
        this.router.get(`${this.path}/:id`, [authMiddleware], this.budgetController.findById);
        this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreateBudgetDto, 'body')], this.budgetController.create);
        this.router.patch(`${this.path}/increase/:id`, [authMiddleware, validationMiddleware(IncreaseBudgetDto, 'body')], this.budgetController.increase);
        this.router.patch(`${this.path}/approve/:id`, [authMiddleware], this.budgetController.approve);
        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreateBudgetDto, 'body')], this.budgetController.update);
        // this.router.patch(`${this.path}`, validationMiddleware(DTO, 'body'), this.BudgetController.createIncentive);
    }
  }
  export default BudgetRoute;