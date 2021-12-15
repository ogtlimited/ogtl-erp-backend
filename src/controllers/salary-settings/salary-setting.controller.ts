/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import {CreateSalarySettingDto, UpdateSalarySettingDto} from '@dtos/salary-settings/salary-settings.dto';
import SalarySettingService from '@/services/salary-settings/salary-settings.service';


class SalarySettingController {
  public salarySettingService = new SalarySettingService();

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const salarySettings = await this.salarySettingService.findAll();
      res.status(200).json({ data: salarySettings});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.salarySettingService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateSalarySettingDto = req.body;
      const createdData = await this.salarySettingService.create(newData);
      res.status(201).json({ data: createdData});
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: UpdateSalarySettingDto = req.body;
      const updatedData = await this.salarySettingService.update(req.params.id, newData);
      res.status(201).json({ data: updatedData});
    } catch (error) {
      next(error);
    }
  };
}

export default SalarySettingController;
