/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import LeaveSettingsService from '@/services/leave/leave-settings';
import { CreateLeaveSettingsDTO, UpdateLeaveSettingsDTO } from '@/dtos/Leave/leave-settings.dto';
import { ILeaveSettings } from '@/interfaces/leave-interface/leave-settings.interface';

class LeaveSettingsController {
  public leaveSettingsService = new LeaveSettingsService();

  public getLeaveSettingss = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllLeaveSettingssData: ILeaveSettings[] = await this.leaveSettingsService.findAllLeavesetting()

      res.status(200).json({ data: findAllLeaveSettingssData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getLeaveSettingsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveSettingsId: string = req.params.id;
      const findOneLeaveSettingsData: ILeaveSettings = await this.leaveSettingsService.findLeavesettingById(LeaveSettingsId);

      res.status(200).json({ data: findOneLeaveSettingsData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLeaveSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveSettingsData: CreateLeaveSettingsDTO = req.body;
      const createLeaveSettingsData: ILeaveSettings = await this.leaveSettingsService.createLeavesetting(LeaveSettingsData);

      res.status(201).json({ data: createLeaveSettingsData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLeaveSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveSettingsId: string = req.params.id;
      const LeaveSettingsData: UpdateLeaveSettingsDTO = req.body;
      const updateLeaveSettingsData: ILeaveSettings = await this.leaveSettingsService.updateLeavesetting(LeaveSettingsId, LeaveSettingsData);

      res.status(200).json({ data: updateLeaveSettingsData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLeaveSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveSettingsId: string = req.params.id;
      const deleteLeaveSettingsData: ILeaveSettings = await this.leaveSettingsService.deleteLeavesetting(LeaveSettingsId);

      res.status(200).json({ data: deleteLeaveSettingsData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default LeaveSettingsController;
