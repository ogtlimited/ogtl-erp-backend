/* eslint-disable prettier/prettier */

import { CreateLeavePolicyDto, UpdateLeavePolicyDto } from '@/dtos/Leave/policy.dto';
import { ILeavePolicy } from '@/interfaces/leave-interface/policy.interface';
import LeavePolicyService from '@/services/leave/policy.service';
import { NextFunction, Request, Response } from 'express';


class LeavePolicyController {
  public LeavePolicyService = new LeavePolicyService();

  public getLeavePolicys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllLeavePolicysData: ILeavePolicy[] = await this.LeavePolicyService.findAllleavePolicy();

      res.status(200).json({ data: findAllLeavePolicysData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLeavePolicyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeavePolicyId: string = req.params.id;
      const findOneLeavePolicyData: ILeavePolicy = await this.LeavePolicyService.findleavePolicyById(LeavePolicyId);

      res.status(200).json({ data: findOneLeavePolicyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLeavePolicy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeavePolicyData: CreateLeavePolicyDto = req.body;
      const createLeavePolicyData: ILeavePolicy = await this.LeavePolicyService.createleavePolicy(LeavePolicyData);

      res.status(201).json({ data: createLeavePolicyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLeavePolicy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeavePolicyId: string = req.params.id;
      const LeavePolicyData: UpdateLeavePolicyDto = req.body;
      const updateLeavePolicyData: ILeavePolicy = await this.LeavePolicyService.updateleavePolicy(LeavePolicyId, LeavePolicyData);

      res.status(200).json({ data: updateLeavePolicyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLeavePolicy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeavePolicyId: string = req.params.id;
      const deleteLeavePolicyData: ILeavePolicy = await this.LeavePolicyService.deleteleavePolicy(LeavePolicyId);

      res.status(200).json({ data: deleteLeavePolicyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default LeavePolicyController;
