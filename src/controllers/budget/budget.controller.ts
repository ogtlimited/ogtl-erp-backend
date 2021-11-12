/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateBudgetDto } from '@/dtos/budget/budget.dto';
import { IBudget } from '@/interfaces/budget/budget.interface';
import BudgetService from '@/services/budget/budget.service';

class BudgetController {
  public budgetService = new BudgetService();

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgetEntries = await this.budgetService.findAll(req.query);
      res.status(200).json({ data: budgetEntries});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getCurrentExpenseHead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const budgetEntries = await this.budgetService.getCurrentExpenseHead(req.query);
      res.status(200).json({ data: budgetEntries});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.budgetService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateBudgetDto = req.body;
      const createdData: IBudget = await this.budgetService.create(req, newData);
      res.status(201).json({ data: createdData});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public approve = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const approvedBudget = await this.budgetService.approve(req, req.params.id);
      res.status(200).json({ data: approvedBudget});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  public increase = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const approvedBudget = await this.budgetService.increaseBudget(req.params.id, req.body);
      res.status(200).json({ data: approvedBudget});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const approvedBudget = await this.budgetService.update(req.params.id, req.body);
      res.status(200).json({ data: approvedBudget});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

}

export default BudgetController;
