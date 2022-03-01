/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateSalarySlipDto } from '@dtos/payroll/salary-slip.dto';
import { ISalarySlip } from '@/interfaces/payroll/salary-slip.interface';
import SalarySlipService from '@/services/payroll/salary-slip.service';

// import mongoose from 'mongoose'

class SalarySlipController {
  public salarySlipService = new SalarySlipService();

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const salarySlips = await this.salarySlipService.findAll(req.query);
      res.status(200).json({ data: salarySlips});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const id: string = req.params.id;
      const data = await this.salarySlipService.findById(req.query);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateSalarySlipDto = req.body;
      const createdData: ISalarySlip = await this.salarySlipService.create(newData);
      res.status(201).json({ data: createdData});
    } catch (error) {

      next(error);
    }
  };

  public createDepartmentPayroll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateSalarySlipDto = req.body;
      const createdData: ISalarySlip = await this.salarySlipService.createDepartmentPayroll(newData);
      res.status(201).json({ data: createdData});
    } catch (error) {
      console.log(error);

      next(error);
    }
  };


}

export default SalarySlipController;
