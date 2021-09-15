/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreatePayrollDto } from '@/dtos/payroll/payroll.dto';
import { IPayRollEntry } from '@/interfaces/payroll/payroll.interface';
import PayRollEntryService from '@/services/payroll/payroll.service';

class PayRollEntryController {
  public payRollEntryService = new PayRollEntryService();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payRollEntries = await this.payRollEntryService.findAll();
      res.status(200).json({ data: payRollEntries});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.payRollEntryService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreatePayrollDto = req.body;
      console.log(newData);
      
      const createdData: IPayRollEntry = await this.payRollEntryService.create(newData, req.query); 
      res.status(201).json({ data: createdData});
    } catch (error) {  
      next(error);
    }
  };

}

export default PayRollEntryController;
