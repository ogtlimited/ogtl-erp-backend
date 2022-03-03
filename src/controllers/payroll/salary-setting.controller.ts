import { NextFunction, Request, Response } from 'express';
import { CreateUpdateSalaryDto } from '@dtos/payroll/salary-setting.dto';
import { ISalarySetting } from '@interfaces/payroll/salary-setting.interface';
import SalarySettingService from '@services/payroll/salary-setting.service';

class SalarySettingController {
  public salarySettingService = new SalarySettingService();

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const salarySettings = await this.salarySettingService.findAllSalarySettings();
      res.status(200).json({ data: salarySettings });
    } catch (error) {
      next(error);
    }
  };

  public createUpdateSalarySettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateUpdateSalaryDto = req.body;
      const createdData: ISalarySetting = await this.salarySettingService.createUpdateSalarySettings(newData);
      res.status(201).json({ data: createdData });
    } catch (error) {
      next(error);
    }
  };
}

export default SalarySettingController;
