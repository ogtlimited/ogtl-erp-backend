/* eslint-disable prettier/prettier */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { NextFunction, Request, Response } from 'express';
import HrLeaveApplicationService from '@/services/leave/hr/hr_application.service';

class HrLeaveApplicationController {
  private hrLeaveApplicationService = new HrLeaveApplicationService();
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
  public getTypesOfLeaveTaken = async (req: any, res: Response, next: NextFunction) => {
    try {
      const typesOfLeaveTaken: any = await this.hrLeaveApplicationService.getTypesOfLeaveTaken();
      res.status(200).json({ data: typesOfLeaveTaken});
    } catch (error) {
      next(error);
    }
  };
  public getLeaveApplicationHistory = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplications: ILeaveApplication[] = await this.hrLeaveApplicationService.getLeaveApplicationHistory(req.query);
      res.status(200).json({ data: leaveApplications });
    } catch (error) {
      next(error);
    }
  };
  public generateLeaveReport = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplications: ILeaveApplication[] = await this.hrLeaveApplicationService.generateLeaveReport(req.query);
      res.status(200).json({ data: leaveApplications });
    } catch (error) {
      next(error);
    }
  };
  public getEmployeesBasedOnLeaveTypesTaken = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplications: ILeaveApplication[] = await this.hrLeaveApplicationService.getEmployeesBasedOnLeaveTypesTaken(req.query);
      res.status(200).json({ data: leaveApplications });
    } catch (error) {
      next(error);
    }
  };
  public getEmployeesBasedOnLeaveStatus = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplications: ILeaveApplication[] = await this.hrLeaveApplicationService.getEmployeesBasedOnLeaveStatus(req.query);
      res.status(200).json({ data: leaveApplications });
    } catch (error) {
      next(error);
    }
  };
}
export default HrLeaveApplicationController;
