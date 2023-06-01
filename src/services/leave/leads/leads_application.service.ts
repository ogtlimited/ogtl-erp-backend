/* eslint-disable prettier/prettier */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';
import applicationModel from '@/models/leave/application.model';
import leaveApprovalLevelModel from '@/models/leave/leave_approval_level.model';
import departmentModel from '@/models/department/department.model';
import EmployeeService from '@services/employee.service';
import LeaveFiltrationService from '@/services/leave/leave_filtration.service';
import LeaveMailingService from '@services/leave/leave_mailing.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import { IDepartment } from '@/interfaces/employee-interface/department.interface';
import EmployeeModel from '@models/employee/employee.model';
import { ILeaveApprovalLevel } from '@/interfaces/leave-interface/leave_approval_level.interface';
import { Request } from 'express';
import moment from 'moment';

class LeadsLeaveApplicationService {
  public application = applicationModel;
  private leaveApprovalLevelModel = leaveApprovalLevelModel;
  private departmentModel = departmentModel;
  public employeeS = new EmployeeService();
  public filtrationService = new LeaveFiltrationService();
  public leaveMailingService = new LeaveMailingService();
  public employeeModel = EmployeeModel;

  public async getLeaveApplicationsForLeads(user: Employee, query: Request): Promise<ILeaveApplication[]> {
    let matchBy = { leave_approver: user._id, hr_stage: { $ne: true }, isAppealled: false, status: "pending"}
   const leaveApplications= await this.filtrationService.getLeaveApplicationsHelperMethod(matchBy, query, this.application)
  return leaveApplications;
  }
  public async approveLeaveApplication(leaveId: String, user: Employee): Promise<ILeaveApplication> {
    const departmentHighestLeaveApprovalLevel = await this.getDepartmentHighestLeaveApprovalLevel(user)
    const leadsApprovalLevel = await this.getLeadLeaveApprovalLevel(user)
    const immediateSupervisorsLeaveApprovalLevel = await this.getImmediateSupervisorsLeaveApprovalLevel(user)
    const leaveApplication = await this.application.findOneAndUpdate(
      { _id: leaveId, leave_approver: user._id, status: { $eq: 'pending' }, hr_stage: { $ne: true }},
      {
        $set: { 
          leave_approver: leadsApprovalLevel === departmentHighestLeaveApprovalLevel ? user._id : user.reports_to,
          hr_stage: leadsApprovalLevel === departmentHighestLeaveApprovalLevel ? true : false,
          acted_on: true,
          approval_level: leadsApprovalLevel === departmentHighestLeaveApprovalLevel ? leadsApprovalLevel : immediateSupervisorsLeaveApprovalLevel,
      },
        $push:{list_of_approvers: user._id}
     },
      { new: true },
    );
    if (!leaveApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
    if(leaveApplication.leave_approver!==null && leaveApplication.hr_stage!==true){
     Promise.all([this.leaveMailingService.sendPendingLeaveNotificationMail(leaveApplication, this.employeeModel)])   
     }
    return leaveApplication;
  }
  public async rejectLeaveApplication(leaveId: String, user: Employee, query: any, body): Promise<ILeaveApplication> {
    const topLead = await this.employeeModel.findOne({_id:user.reports_to})
    const topLeadFirstName = topLead?.first_name.charAt(0) + topLead?.first_name.toLowerCase().slice(1)
    const leaveApplication = await this.application.findOneAndUpdate(
      { _id: leaveId, leave_approver: user._id, status: { $eq: 'pending' }, hr_stage: { $ne: true } },
      {
        $set: {
          status: "rejected",
          acted_on: true,
          rejection_reason: query.rejection_reason,
      },
      },
      { new: true },
    );
    if (!leaveApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
     Promise.all(
       [this.leaveMailingService.sendLeaveRejectionNotificationMail(leaveApplication, body.rejection_reason, this.employeeModel),
         this.leaveMailingService.sendRejectionNotificationToHr(leaveApplication, this.employeeModel, "HR", "hr@outsourceglobal.com", body.rejection_reason)
    ])
    if (topLead !== null){
      Promise.all([this.leaveMailingService.sendRejectionNotificationToHr(leaveApplication, this.employeeModel, topLeadFirstName, "hr@outsourceglobal.com", body.rejection_reason)])
    } 
    return leaveApplication;
  }
  public async getLeadLeaveApprovalLevel(user: Employee): Promise<number>{
    const usersLeaveApprovalLevel: ILeaveApprovalLevel = await this.employeeModel.findOne({ogid: user?.ogid})
    return usersLeaveApprovalLevel.leaveApprovalLevel
  }
  public async getImmediateSupervisorsLeaveApprovalLevel(user: Employee): Promise<number>{
    const leadLeaveApprovalLevel = await this.getLeadLeaveApprovalLevel(user)
    const departmentHighestLeaveApprovalLevel = await this.getDepartmentHighestLeaveApprovalLevel(user)
    const supervisorsRecord: Employee = await this.employeeModel.findOne({_id: user?.reports_to})
    const supervisorsLeaveApprovalRecords = await this.employeeModel.findOne({ ogid: user?.ogid })
    if (supervisorsLeaveApprovalRecords !== null) return supervisorsLeaveApprovalRecords.leaveApprovalLevel
    if(leadLeaveApprovalLevel === departmentHighestLeaveApprovalLevel)
    return leadLeaveApprovalLevel
  }
  public async getLeaveApplicationHistory(user: Employee, query): Promise<ILeaveApplication[]> {
    const userIdToString = user._id.toString()
    let matchBy = { $and: [{ acted_on: true }, { $or: [{ leave_approver: user._id }, { list_of_approvers: userIdToString }]}]} 
    const leaveApplications = await this.filtrationService.getLeaveApplicationsHelperMethod(matchBy, query, this.application)
    return leaveApplications
  }
  public async requestLeaveModification(query, body, user): Promise<void> {
    const leaveApplications: ILeaveApplication = await this.application.findOne(query)
    const leaveApplicant = await this.employeeModel.findOne({_id: leaveApplications.employee_id})
    const leaveApplicantFirstName = leaveApplicant.first_name
    const leaveApproverFirstName = user.first_name.charAt(0) + user.first_name.toLowerCase().slice(1)
    const leaveApplicantEmail = leaveApplicant.company_email
    Promise
      .all([this.leaveMailingService.requestForLeaveModificationMail(leaveApproverFirstName, leaveApplicantFirstName, body.reasons, leaveApplicantEmail)])
  }
  public async getAppealedLeavesApplicationsForLeads(user: Employee, query: Request): Promise<ILeaveApplication[]> {
    const user_id = user._id.toString()
    let matchBy = { leave_approver: user._id, hr_stage: { $ne: true }, isAppealled: true, status: "pending", list_of_approvers: { $ne: user_id } }
    const leaveApplications = await this.filtrationService.getLeaveApplicationsHelperMethod(matchBy, query, this.application)
    return leaveApplications;
  }

  public async getTotalActiveLeaves(user: Employee): Promise<any> {
    const today = moment().endOf('day')
    const user_id = user._id.toString()
    let matchBy = { list_of_approvers: { $eq: user_id }, status: "approved", to_date: { $gte: today }}
    const totalLeaveApplications = await this.application.find(matchBy)
    return totalLeaveApplications.length;
  }
  private async getDepartmentHighestLeaveApprovalLevel(user: Employee): Promise<number> {
    const departmentRecord: IDepartment = await this.departmentModel.findOne({ _id: user.department })
    return departmentRecord.leave_approval_level
  }
}
export default LeadsLeaveApplicationService;
