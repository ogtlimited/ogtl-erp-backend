/* eslint-disable prettier/prettier */

import { LeaveApprovalLevelDto } from '@/dtos/Leave/leave_approval_level.dto';
import { ILeaveApprovalLevel } from '@/interfaces/leave-interface/leave_approval_level.interface';
import { NextFunction, Request, Response } from 'express';
import LeaveApprovalLevelService from '@/services/leave/leave_approval_level.service';

class LeaveApprovalLevelController {
  public leaveApprovalLevelService = new LeaveApprovalLevelService();
  public createLeaveApprovalLevel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaveApprovalLevel: LeaveApprovalLevelDto = await this.leaveApprovalLevelService.createLeaveApprovalLevel(req.body);
      res.status(200).json({ data: leaveApprovalLevel});
    } catch (error) {
      next(error);
    }
  };
  public findAllLeaveApprovalLevels = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allLeaveApprovalLevels: ILeaveApprovalLevel[] = await this.leaveApprovalLevelService.findAllLeaveApprovalLevels();
      res.status(200).json({ data: allLeaveApprovalLevels});
    } catch (error) {
      next(error);
    }
  };
  public findLeaveApprovalLevelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leaveApprovalLevelId } = req.params
      const leaveApprovalLevel: ILeaveApprovalLevel = await this.leaveApprovalLevelService.findLeaveApprovalLevelById(leaveApprovalLevelId);
      res.status(200).json({ data: leaveApprovalLevel});
    } catch (error) {
      next(error);
    }
  };
}
export default LeaveApprovalLevelController;
