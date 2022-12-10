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

  public getLeaveApplicationsForLeads = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplicationsForTeamLeads: ILeaveApplication[] = await this.leaveApplicationService.getLeaveApplicationsForLeads(req.user, req.query);
      res.status(200).json({ data: leaveApplicationsForTeamLeads});
    } catch (error) {
      next(error);
    }
  };
  public getLeaveApplicationsForHr = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveApplicationsForHr: ILeaveApplication[] = await this.leaveApplicationService.getLeaveApplicationsForHr(req.query);
      res.status(200).json({ data: leaveApplicationsForHr});
    } catch (error) {
      next(error);
    }
  };
  public approveHrLeaveApplications = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.leaveApplicationService.approveHrLeaveApplications(leaveId);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  public rejectHrLeaveApplications = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.leaveApplicationService.rejectHrLeaveApplications(leaveId);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  public approveLeadsLeaveApplications = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.leaveApplicationService.approveLeadsLeaveApplications(leaveId, req.user);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  public rejectLeadsLeaveApplications = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {leaveId} = req.params
      const leaveApplications: any = await this.leaveApplicationService.rejectLeadsLeaveApplications(leaveId, req.user, req.body);
      res.status(200).json({ data: leaveApplications});
    } catch (error) {
      next(error);
    }
  };
  public checkWhetherUserIsALead = async (req: any, res: Response, next: NextFunction) => {
    try {
      const isUserALead: any = await this.leaveApplicationService.checkWhetherUserIsALead(req.user);
      res.status(200).json({ data: isUserALead});
    } catch (error) {
      next(error);
    }
  };
  public getLeaveapplicationByEmployeeId = async (req: any, res: Response, next: NextFunction) => {
    try {
      const { employee_id } = req.params
      const leaveApplication: any = await this.leaveApplicationService.getLeaveapplicationByEmployeeId(employee_id);
      res.status(200).json({ data: leaveApplication});
    } catch (error) {
      next(error);
    }
  };
  public countHrPendingLeaves = async (req: any, res: Response, next: NextFunction) => {
    try {
      const hrPendingLeaves: any = await this.leaveApplicationService.countHrPendingLeaves();
      res.status(200).json({ data: hrPendingLeaves});
    } catch (error) {
      next(error);
    }
  };
  public countHrApprovedLeaves = async (req: any, res: Response, next: NextFunction) => {
    try {
      const hrApprovedLeaves: any = await this.leaveApplicationService.countHrApprovedLeaves();
      res.status(200).json({ data: hrApprovedLeaves});
    } catch (error) {
      next(error);
    }
  };
  public countHrRejectedLeaves = async (req: any, res: Response, next: NextFunction) => {
    try {
      const hrRejectedLeaves: any = await this.leaveApplicationService.countHrRejectedLeaves();
      res.status(200).json({ data: hrRejectedLeaves});
    } catch (error) {
      next(error);
    }
  };
  public countUsedLeavesByEmployee = async (req: any, res: Response, next: NextFunction) => {
    try {
      const usedLeaves: any = await this.leaveApplicationService.countUsedLeavesByEmployee(req.user);
      res.status(200).json({ data: usedLeaves});
    } catch (error) {
      next(error);
    }
  };
  public countMedicalLeavesByEmployee = async (req: any, res: Response, next: NextFunction) => {
    try {
      const medicalLeaves: any = await this.leaveApplicationService.countMedicalLeavesByEmployee(req.user);
      res.status(200).json({ data: medicalLeaves});
    } catch (error) {
      next(error);
    }
  };
  public countOtherLeaves = async (req: any, res: Response, next: NextFunction) => {
    try {
      const otherLeaves: any = await this.leaveApplicationService.countOtherLeaves(req.user);
      res.status(200).json({ data: otherLeaves});
    } catch (error) {
      next(error);
    }
  };
  public countRemainingLeaves = async (req: any, res: Response, next: NextFunction) => {
    try {
      const remainingLeaves: any = await this.leaveApplicationService.countRemainingLeaves(req.user);
      res.status(200).json({ data: remainingLeaves});
    } catch (error) {
      next(error);
    }
  };
  public countEmployeesOnLeave = async (req: any, res: Response, next: NextFunction) => {
    try {
      const employeesOnLeave: any = await this.leaveApplicationService.countEmployeesOnLeave(req.user);
      res.status(200).json({ data: employeesOnLeave});
    } catch (error) {
      next(error);
    }
  };
}

export default LeaveApplicationController;
