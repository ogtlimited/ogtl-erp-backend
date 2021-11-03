/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateExpenseHeadDraftDto } from '../../dtos/expense-head-draft/expense-head-draft.dto';
import { IExpenseHeadDraft } from '../../interfaces/expense-head-draft/expense-head-draft.interface';
import ExpenseHeadDraftService from '../../services/expense-head-draft/expense-head-draft.service';

class ExpenseHeadDraftController {
  public service = new ExpenseHeadDraftService();

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseHeadDraftEntries = await this.service.findAll(req.query);
      res.status(200).json({ data: expenseHeadDraftEntries});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.service.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateExpenseHeadDraftDto = req.body;
      const createdData: IExpenseHeadDraft = await this.service.create(req, newData);
      res.status(201).json({ data: createdData});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  // public approve = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const approvedBudget = await this.service.approve(req.params.id);
  //     res.status(200).json({ data: approvedBudget});
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // };


  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateDraft = await this.service.update(req.params.id, req.body);
      res.status(200).json({ data: updateDraft});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

}

export default ExpenseHeadDraftController;
