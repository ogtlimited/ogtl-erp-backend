/* eslint-disable prettier/prettier */
import { CreateLeavePeriodDto, UpdateLeavePeriodDto } from '@/dtos/Leave/period.dto';
import { ILeavePeriod } from '@/interfaces/leave-interface/period.interface';
import LeavePeriodService from '@/services/leave/period.service';
import { NextFunction, Request, Response } from 'express';


class LeavePeriodController {
  public LeavePeriodService = new LeavePeriodService();

  public getLeavePeriods = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllLeavePeriodsData: ILeavePeriod[] = await this.LeavePeriodService.findAllleavePeriod();

      res.status(200).json({ data: findAllLeavePeriodsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLeavePeriodById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeavePeriodId: string = req.params.id;
      const findOneLeavePeriodData: ILeavePeriod = await this.LeavePeriodService.findleavePeriodById(LeavePeriodId);

      res.status(200).json({ data: findOneLeavePeriodData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLeavePeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeavePeriodData: CreateLeavePeriodDto = req.body;
      const createLeavePeriodData: ILeavePeriod = await this.LeavePeriodService.createleavePeriod(LeavePeriodData);

      res.status(201).json({ data: createLeavePeriodData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLeavePeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeavePeriodId: string = req.params.id;
      const LeavePeriodData: UpdateLeavePeriodDto = req.body;
      const updateLeavePeriodData: ILeavePeriod = await this.LeavePeriodService.updateleavePeriod(LeavePeriodId, LeavePeriodData);

      res.status(200).json({ data: updateLeavePeriodData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLeavePeriod = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeavePeriodId: string = req.params.id;
      const deleteLeavePeriodData: ILeavePeriod = await this.LeavePeriodService.deleteleavePeriod(LeavePeriodId);

      res.status(200).json({ data: deleteLeavePeriodData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default LeavePeriodController;
