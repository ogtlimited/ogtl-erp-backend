/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { CreateLeaveAllocationDto, UpdateLeaveAllocationDto } from '@dtos/Leave/allocation.dto';
import { ILeaveAllocation } from '@interfaces/leave-interface/allocation.interface';

import LeaveAllocationService from '@/services/leave/allocation.service';

class LeaveAllocationController {
  public leaveAllocationService = new LeaveAllocationService();

  public getLeaveAllocations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllLeaveAllocationsData: ILeaveAllocation[] = await this.leaveAllocationService.findAllLeaveAllocation();

      res.status(200).json({ data: findAllLeaveAllocationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLeaveAllocationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveAllocationId: string = req.params.id;
      const findOneLeaveAllocationData: ILeaveAllocation = await this.leaveAllocationService.findLeaveAllocationById(LeaveAllocationId);

      res.status(200).json({ data: findOneLeaveAllocationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLeaveAllocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveAllocationData: CreateLeaveAllocationDto = req.body;
      const createLeaveAllocationData: ILeaveAllocation = await this.leaveAllocationService.createLeaveAllocation(LeaveAllocationData);

      res.status(201).json({ data: createLeaveAllocationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLeaveAllocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveAllocationId: string = req.params.id;
      const LeaveAllocationData: UpdateLeaveAllocationDto = req.body;
      const updateLeaveAllocationData: ILeaveAllocation = await this.leaveAllocationService.updateLeaveAllocation(LeaveAllocationId, LeaveAllocationData);

      res.status(200).json({ data: updateLeaveAllocationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLeaveAllocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveAllocationId: string = req.params.id;
      const deleteLeaveAllocationData: ILeaveAllocation = await this.leaveAllocationService.deleteLeaveAllocation(LeaveAllocationId);

      res.status(200).json({ data: deleteLeaveAllocationData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default LeaveAllocationController;
