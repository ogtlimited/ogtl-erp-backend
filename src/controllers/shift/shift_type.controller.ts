/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateShiftTypeDto } from '@dtos/shift/shift_type.dto';
import { ShiftType } from '@interfaces/shift-interface/shift_type.interface';



import shiftTypeService from '@/services/shift/shift.service';

class ShiftTypeController {
  public shiftService = new shiftTypeService();

  public getShifts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllshiftsData: ShiftType[] = await this.shiftService.findAllshiftType();

      res.status(200).json({ data: findAllshiftsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getShiftById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftId: string = req.params.id;
      const findOneshiftData: ShiftType = await this.shiftService.findshiftTypeById(shiftId);

      res.status(200).json({ data: findOneshiftData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createShift = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftData: CreateShiftTypeDto = req.body;
      const createshiftData: ShiftType = await this.shiftService.createshiftType(shiftData);

      res.status(201).json({ data: createshiftData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateShift = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftId: string = req.params.id;
      const shiftData: CreateShiftTypeDto = req.body;
      const updateshiftData: ShiftType = await this.shiftService.updateshiftType(shiftId, shiftData);

      res.status(200).json({ data: updateshiftData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteShift = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftId: string = req.params.id;
      const deleteshiftData = await this.shiftService.deleteshiftType;(shiftId);

      res.status(200).json({ data: deleteshiftData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ShiftTypeController;
