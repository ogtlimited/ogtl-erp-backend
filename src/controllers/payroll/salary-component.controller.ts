/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateSalaryComponentDto} from '@dtos/payroll/salary-component.dto';
import SalaryComponentService from '@/services/payroll/salary-component.service';
import { ISalaryComponent } from '@/interfaces/payroll/salary-component.interface';


class SalaryComponentController {
  public salaryComponentService = new SalaryComponentService();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const salaryStructures = await this.salaryComponentService.findAll();
      res.status(200).json({ data: salaryStructures});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.salaryComponentService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateSalaryComponentDto = req.body;
      const createdData: ISalaryComponent = await this.salaryComponentService.create(newData); 
      res.status(201).json({ data: createdData});
    } catch (error) {
      
      next(error);
    }
  };

}

export default SalaryComponentController;