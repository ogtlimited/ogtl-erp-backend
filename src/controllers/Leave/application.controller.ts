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
  public supervisorApproveLeave = async (req: any, res: Response, next: NextFunction) => {
    try {
      const approveLeave: ILeaveApplication = await this.leaveApplicationService.supervisorApproveLeave(req.query.id, req.query.approve, req.user);
      res.status(200).json({ data: approveLeave });
    } catch (error) {
      next(error);
    }
  };
  public hrApproveLeave = async (req: any, res: Response, next: NextFunction) => {
    try {
      const approveLeave: ILeaveApplication = await this.leaveApplicationService.HrApproveLeave(req.params.id, req.query.approve, req.user);
      res.status(200).json({ data: approveLeave});
    } catch (error) {
      next(error);
    }
  };
  // public hrRejectLeave = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const rejectLeave: ILeaveApplication = await this.leaveApplicationService.HrRejectLeave(req.params.id);
  //     res.status(200).json({ data: rejectLeave});
  //   } catch (error) {
  //     next(error);
  //   }
  // };

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
      const LeaveApplicationData: CreateLeaveApplicationDTO = req.body;
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

      res.status(200).json({ data: updateLeaveApplicationData, message: 'updated' });
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
}

export default LeaveApplicationController;
