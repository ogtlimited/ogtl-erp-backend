/* eslint-disable prettier/prettier */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { NextFunction, Request, Response } from 'express';
import HrLeaveApplicationService from '@/services/leave/hr/hr_application.service';

class HrLeaveApplicationController {
  public hrLeaveApplicationService = new HrLeaveApplicationService();
  public getLeaveApplicationsForHr = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplicationsForHr: ILeaveApplication[] = await this.hrLeaveApplicationService.getLeaveApplicationsForHr(req.query);
      res.status(200).json({ data: leaveApplicationsForHr});
    } catch (error) {
      next(error);
    }
  };
  public approveLeaveApplicationsByHr = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.hrLeaveApplicationService.approveLeaveApplicationsByHr(leaveId);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  public rejectLeaveApplicationsByHr = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.hrLeaveApplicationService.rejectLeaveApplicationsByHr(leaveId);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  public getLeaveStatusCountForHrDashboardAnalytics = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveStatus: any = await this.hrLeaveApplicationService.getLeaveStatusCountForHrDashboardAnalytics();
      res.status(200).json({ data: leaveStatus});
    } catch (error) {
      next(error);
    }
  };
  public countEmployeesOnLeave = async (req: any, res: Response, next: NextFunction) => {
    try {
      const employeesOnLeave: any = await this.hrLeaveApplicationService.countEmployeesOnLeave();
      res.status(200).json({ data: employeesOnLeave});
    } catch (error) {
      next(error);
    }
  };

}
export default HrLeaveApplicationController;
