/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateDeductionDto } from '@dtos/payroll/deduction.dto';
import DeductionService from '@/services/payroll/deduction.service';


class DeductionController {
  public deductionService = new DeductionService();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deductions = await this.deductionService.findAll();
      res.status(200).json({ data: deductions});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.deductionService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateDeductionDto = req.body;
      const createdData = await this.deductionService.create(newData); 
      res.status(201).json({ data: createdData});
    } catch (error) {
      next(error);
    }
  };
}

export default DeductionController;
