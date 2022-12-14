/* eslint-disable prettier/prettier */
import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { NextFunction, Request, Response } from 'express';
import LeadsLeaveApplicationService from '@/services/leave/leads/leads_application.service';



class LeaveApplicationController {
  public leadsLeaveApplicationService = new LeadsLeaveApplicationService();
 public getLeaveApplicationsForLeads = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplicationsForTeamLeads: ILeaveApplication[] = await this.leadsLeaveApplicationService.getLeaveApplicationsForLeads(req.user, req.query);
      res.status(200).json({ data: leaveApplicationsForTeamLeads});
    } catch (error) {
      next(error);
    }
  };
  public approveLeaveApplicationByLead = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.leadsLeaveApplicationService.approveLeaveApplicationByLead(leaveId, req.user);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  public rejectLeaveApplicationByLead = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.leadsLeaveApplicationService.rejectLeaveApplicationByLead(leaveId, req.user, req.body);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  
}

export default LeaveApplicationController;
