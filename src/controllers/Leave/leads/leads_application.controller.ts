/* eslint-disable prettier/prettier */
import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { NextFunction, Request, Response } from 'express';
import LeadsLeaveApplicationService from '@/services/leave/leads/leads_application.service';


class LeadsLeaveApplicationController {
  private leadsLeaveApplicationService = new LeadsLeaveApplicationService();
  public getLeaveApplicationsForLeads = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplicationsForTeamLeads: ILeaveApplication[] = await this.leadsLeaveApplicationService.getLeaveApplicationsForLeads(req.user, req.query);
      res.status(200).json({ data: leaveApplicationsForTeamLeads});
    } catch (error) {
      next(error);
    }
  };
  public approveLeaveApplication = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.leadsLeaveApplicationService.approveLeaveApplication(leaveId, req.user);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  public rejectLeaveApplication = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.leadsLeaveApplicationService.rejectLeaveApplication(leaveId, req.user, req.body, req.body);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  public getLeaveApplicationHistory = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplications: any = await this.leadsLeaveApplicationService.getLeaveApplicationHistory(req.user, req.query);
      res.status(200).json({ data: leaveApplications });
    } catch (error) {
      next(error);
    }
  };  
  public requestLeaveModification = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplications: any = await this.leadsLeaveApplicationService.requestLeaveModification(req.query, req.body, req.user);
      res.status(200).json({ data: leaveApplications });
    } catch (error) {
      next(error);
    }
  };  
  public getAppealedLeavesApplicationsForLeads = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplications: any = await this.leadsLeaveApplicationService.getAppealedLeavesApplicationsForLeads(req.user, req.query);
      res.status(200).json({ data: leaveApplications });
    } catch (error) {
      next(error);
    }
  };  
  public getTotalActiveLeaves = async (req: any, res: Response, next: NextFunction) => {
    try {
      const totalActiveLeaves: any = await this.leadsLeaveApplicationService.getTotalActiveLeaves(req.user);
      res.status(200).json({ data: totalActiveLeaves });
    } catch (error) {
      next(error);
    }
  };  
}

export default LeadsLeaveApplicationController;
