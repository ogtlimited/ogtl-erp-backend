/* eslint-disable prettier/prettier */

import { CreateLeaveApplicationDTO, UpdateLeaveApplicationDTO } from '@/dtos/Leave/application.dto';
import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { NextFunction, Request, Response } from 'express';
import LeaveApplicationService from '@/services/leave/application.service';



class LeaveApplicationController {
  public leaveApplicationService = new LeaveApplicationService();

  public getLeaveApplications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query
      const findAllLeaveApplicationsData: ILeaveApplication[] = await this.leaveApplicationService.findAllLeaveapplication(query);

      res.status(200).json({ data: findAllLeaveApplicationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public findAllTeamMembersLeave = async (req: any, res: Response, next: NextFunction) => {
    try {
      const allTeamMembersLeave: ILeaveApplication[] = await this.leaveApplicationService.findAllTeamMembersLeave(req.user);
      res.status(200).json({ data: allTeamMembersLeave});
    } catch (error) {
      next(error);
    }
  };
  public findAllLeaveapplicationsClient = async (req: any, res: Response, next: NextFunction) => {
    try {
      const ClientId: string = req.params.id;
      const allLeaveApplicationClient: ILeaveApplication[] = await this.leaveApplicationService.findAllLeaveapplicationsClient(ClientId);
      res.status(200).json({ data: allLeaveApplicationClient});
    } catch (error) {
      next(error);
    }
  };
 public getLeaveApplicationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveApplicationId: string = req.params.id;
      const findOneLeaveApplicationData: ILeaveApplication = await this.leaveApplicationService.findLeaveapplicationById(LeaveApplicationId);

      res.status(200).json({ data: findOneLeaveApplicationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createLeaveApplication = async (req: any, res: Response, next: NextFunction) => {
    try {
      const LeaveApplicationData = req.body;
      const createLeaveApplicationData: ILeaveApplication = await this.leaveApplicationService.createLeaveapplication(LeaveApplicationData, req.user);
      res.status(201).json({ data: createLeaveApplicationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateLeaveApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveApplicationId: string = req.params.id;
      const LeaveApplicationData: UpdateLeaveApplicationDTO = req.body;
      const updateLeaveApplicationData: ILeaveApplication = await this.leaveApplicationService.updateLeaveapplication(LeaveApplicationId, LeaveApplicationData);
      res.status(200).json({ data: updateLeaveApplicationData});
    } catch (error) {
      next(error);
    }
  };
  public updateLeaveCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveCountData = req.body;
      const updateLeaveApplicationData = await this.leaveApplicationService.updateLeaveCount(LeaveCountData);

      res.status(200).json({ data: updateLeaveApplicationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteLeaveApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const LeaveApplicationId: string = req.params.id;
      const deleteLeaveApplicationData: ILeaveApplication = await this.leaveApplicationService.deleteLeaveapplication(LeaveApplicationId);

      res.status(200).json({ data: deleteLeaveApplicationData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public getLeaveApplication = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplication: any = await this.leaveApplicationService.getLeaveApplication(req.query);
      res.status(200).json({ data: leaveApplication});
    } catch (error) {
      next(error);
    }
  };
  public getAllLeaveAprovers = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApprovers: any = await this.leaveApplicationService.getAllLeaveAprovers(req.user);
      res.status(200).json({ data: leaveApprovers });
    } catch (error) {
      next(error);
    }
  };
  public getLeaveApplicationProgress = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplicationProgress: any = await this.leaveApplicationService.getLeaveApplicationProgress(req.user);
      res.status(200).json({ data: leaveApplicationProgress });
    } catch (error) {
      next(error);
    }
  };
  public appealRejectedLeave = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplicationProgress: any = await this.leaveApplicationService.appealRejectedLeave(req.query, req.body, req.user);
      res.status(200).json({ data: leaveApplicationProgress });
    } catch (error) {
      next(error);
    }
  };
  public getNumberOfLeaveDaysApplied = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveDaysApplied: any = await this.leaveApplicationService.getNumberOfLeaveDaysApplied(req.query);
      res.status(200).json({ data: leaveDaysApplied });
    } catch (error) {
      next(error);
    }
  };
}

export default LeaveApplicationController;
