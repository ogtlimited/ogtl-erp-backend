/* eslint-disable prettier/prettier */

import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from '@/dtos/Leave/leave-type.dto';
import { ILeaveType } from '@/interfaces/leave-interface/leave-type.interface';
import { NextFunction, Request, Response } from 'express';
import LeaveTypeService from '@/services/leave/leave-type.service';



class LeaveTypeController {
  public LeaveTypeService = new LeaveTypeService();

  public getLeaveTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllLeaveTypesData: ILeaveType[] = await this.LeaveTypeService.findAllLeaveType();

      res.status(200).json({ data: findAllLeaveTypesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLeaveTypeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveTypeId: string = req.params.id;
      const findOneLeaveTypeData: ILeaveType = await this.LeaveTypeService.findLeaveTypeById(LeaveTypeId);

      res.status(200).json({ data: findOneLeaveTypeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLeaveType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveTypeData: CreateLeaveTypeDto = req.body;
      const createLeaveTypeData: ILeaveType = await this.LeaveTypeService.createLeaveType(LeaveTypeData);

      res.status(201).json({ data: createLeaveTypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLeaveType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveTypeId: string = req.params.id;
      const LeaveTypeData: UpdateLeaveTypeDto = req.body;
      const updateLeaveTypeData: ILeaveType = await this.LeaveTypeService.updateLeaveType(LeaveTypeId, LeaveTypeData);

      res.status(200).json({ data: updateLeaveTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLeaveType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveTypeId: string = req.params.id;
      const deleteLeaveTypeData: ILeaveType = await this.LeaveTypeService.deleteLeaveType(LeaveTypeId);

      res.status(200).json({ data: deleteLeaveTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default LeaveTypeController;
