/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateDeductionTypeDto } from '@dtos/payroll/deductionType.dto';
import DeductionTypeService from '@/services/payroll/deductionType.service';

class DeductionTypeController {
  public deductionTypeService = new DeductionTypeService();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deductionTypes = await this.deductionTypeService.findAll();
      res.status(200).json({ data: deductionTypes});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.deductionTypeService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateDeductionTypeDto = req.body;
      const createdData = await this.deductionTypeService.create(newData); 
      res.status(201).json({ data: createdData});
    } catch (error) {
      next(error);
    }
  };

}

export default DeductionTypeController;
