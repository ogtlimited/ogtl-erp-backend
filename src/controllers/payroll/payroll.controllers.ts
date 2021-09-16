/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreatePayrollDto } from '@/dtos/payroll/payroll.dto';
import { IPayRoll } from '@/interfaces/payroll/payroll.interface';
import PayRollService from '@/services/payroll/payroll.service';

class PayRollController {
  public payRollService = new PayRollService();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payRollEntries = await this.payRollService.findAll();
      res.status(200).json({ data: payRollEntries});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.payRollService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreatePayrollDto = req.body;
      console.log(newData);
      
      const createdData: IPayRoll = await this.payRollService.create(newData, req.query); 
      res.status(201).json({ data: createdData});
    } catch (error) {  
      console.log(error);
      next(error);
    }
  };

}

export default PayRollController;
