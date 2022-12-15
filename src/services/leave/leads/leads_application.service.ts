/* eslint-disable prettier/prettier */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';

import applicationModel from '@/models/leave/application.model';
import leaveApprovalLevelModel from '@/models/leave/leave_approval_level.model';
import departmentModel from '@/models/department/department.model';
import EmployeeService from '@services/employee.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import { IDepartment } from '@/interfaces/employee-interface/department.interface';
import EmployeeModel from '@models/employee/employee.model';
import { ILeaveApprovalLevel } from '@/interfaces/leave-interface/leave_approval_level.interface';
import EmailService from '@/utils/email.service';
import { leadsLeaveNotificationMessage, leaveApplicationStatusMessage } from '@/utils/message';
import { Request } from 'express';

class LeadsLeaveApplicationService {
  public application = applicationModel;
  private leaveApprovalLevelModel = leaveApprovalLevelModel;
  private departmentModel = departmentModel;
  public employeeS = new EmployeeService();
  public employeeModel = EmployeeModel;

  public async getLeaveApplicationsForLeads(user: Employee, query: Request): Promise<ILeaveApplication[]> {
   let matchBy = { leave_approver: user._id, hr_stage:{$ne: true}}
   const leaveApplications= await this.getLeaveApplicationsHelperMethod(matchBy,query)
  return leaveApplications;
  }
  public async approveLeaveApplicationByLead(leaveId: String, user: Employee): Promise<ILeaveApplication> {
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
      }
     },
      { new: true },
    );
    if (!leaveApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
    if(leaveApplication.leave_approver!==null && leaveApplication.hr_stage!==true){
     Promise.all([this.sendPendingLeaveNotificationMail(leaveApplication)])   
     }
    return leaveApplication;
  }
  public async rejectLeaveApplicationByLead(leaveId: String, user: Employee, query: any): Promise<ILeaveApplication> {
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
     Promise.all([this.sendLeaveStatusNotificationMail(leaveApplication, "rejected")])
    return leaveApplication;
  }
   private async getDepartmentHighestLeaveApprovalLevel(user: Employee): Promise<number>{
    const departmentRecord: IDepartment = await this.departmentModel.findOne({_id: user.department})
    return departmentRecord.leave_approval_level
  }
  public async getLeadLeaveApprovalLevel(user: Employee): Promise<number>{
    const usersLeaveApprovalLevel: ILeaveApprovalLevel = await this.leaveApprovalLevelModel.findOne({designation_id: user?.designation})
    return usersLeaveApprovalLevel.approval_level
  }
  public async getImmediateSupervisorsLeaveApprovalLevel(user: Employee): Promise<number>{
    const leadLeaveApprovalLevel = await this.getLeadLeaveApprovalLevel(user)
    const departmentHighestLeaveApprovalLevel = await this.getDepartmentHighestLeaveApprovalLevel(user)
    const supervisorsRecord: Employee = await this.employeeModel.findOne({_id: user?.reports_to})
    const supervisorsLeaveApprovalRecords: ILeaveApplication = await this.leaveApprovalLevelModel.findOne({designation_id: supervisorsRecord?.designation})
    if(supervisorsLeaveApprovalRecords !== null) return supervisorsLeaveApprovalRecords.approval_level
    if(leadLeaveApprovalLevel === departmentHighestLeaveApprovalLevel)
    return leadLeaveApprovalLevel
  }
   private async getLeaveApplicationsHelperMethod(matchBy,searchQuery:any): Promise<any> {
    let MAX_LIMIT = 50
    const page = parseInt(searchQuery?.page) || 1;
    let limit: number;
    if(!searchQuery.limit){
      limit = 10
    }
    else if(parseInt(searchQuery?.limit)>MAX_LIMIT){
      limit = MAX_LIMIT
    }
    else if(parseInt(searchQuery?.limit)){
      limit = parseInt(searchQuery.limit)
    }
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const filtrationQuery = this.filtrationQuerymethod(matchBy, searchQuery, startIndex, limit)
    const application: Employee[] = await this.application
    .aggregate(filtrationQuery)
    
    const removeLimitAndSkip:any = filtrationQuery.filter(item => !item["$limit"] && !item["$skip"])
    removeLimitAndSkip.push({$count:"Number of Docs"})
    const countDocuments: any = await this.application.aggregate(removeLimitAndSkip)
    let totalPage:number;
    for(let count of countDocuments){
       totalPage = count["Number of Docs"]
    }
    const pagination: any = {numberOfPages:Math.ceil(totalPage/limit)};
    if(endIndex < totalPage){
      pagination.next = {
        page: page + 1,
        limit: limit
      }
    }
    if(startIndex > 0){
      pagination.previous = {
        page: page - 1,
        limit: limit
      }
    }
    return { 
      application,
      pagination: pagination,
      totalLeave: application.length
    }
  }
  
  private filtrationQuerymethod(matchBy, searchQuery, startIndex:number, limit:number){ 
    const filtrationQuery:any = [
      {
        $match: matchBy
      },
      {
       $lookup:{
         from: "departments",
         localField: "department_id",
         foreignField: "_id",
         as: "department"
      }
      },
      {
       $unwind: {path :"$department",
       preserveNullAndEmptyArrays: true
      }
      },
      {
       $lookup:{
         from: "employees",
         localField: "employee_id",
         foreignField: "_id",
         as: "employee"
         }
       },
      {
       $unwind: {path :"$employee",
       preserveNullAndEmptyArrays: true
     }
     },
     {
      $sort:{
        "createdAt": -1
      }
     }
     ]
     if(searchQuery.search){
      filtrationQuery.push(
        {
          $match:{
            $or : [
              { "employee.first_name":{$regex:searchQuery.search, $options:"i"}},
              { "employee.last_name":{$regex:searchQuery.search, $options:"i"}},
              { "employee.middle_name":{$regex:searchQuery.search, $options:"i"}},
              { "department.department":{$regex:searchQuery.search, $options:"i"}}
            ]
          }
        }
      )
      }
      if(searchQuery.department){
      filtrationQuery.push(
        {
          $match: { "department.department":{$regex:searchQuery.department, $options:"i"}}    
         }
      )
      }
      if(searchQuery.leave_type){
        filtrationQuery.push(
          {
            $match: { leave_type:{$regex:searchQuery.leave_type, $options:"i"}}    
            }
        )
        }
      if(searchQuery?.page){
        filtrationQuery.push(
          { $skip: startIndex },
          )
        }
      if(searchQuery?.limit){
        filtrationQuery.push(
          { $limit: limit},
          )
        }
      return filtrationQuery
  }
  private async sendPendingLeaveNotificationMail(applicant){
    const leaveApplicant = await this.employeeModel.findOne({_id: applicant.employee_id})
    const formattedLeaveApplicantFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
    const supervisor = applicant.leave_approver ? await this.employeeModel.findOne({_id: applicant?.leave_approver}): null
    const formattedSupervisorFirstName = supervisor?.first_name.charAt(0) + supervisor?.first_name.toLowerCase().slice(1)
    const {message, subject} = leadsLeaveNotificationMessage(formattedSupervisorFirstName, formattedLeaveApplicantFirstName) 
    const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
    // EmailService.sendMail(supervisor.company_email, "hr@outsourceglobal.com", subject, message, body)
    EmailService.sendMail("abubakarmoses@yahoo.com", "hr@outsourceglobal.com", subject, message, body)
  }
  private async sendLeaveStatusNotificationMail(applicant, status){
    const leaveApplicant = await this.employeeModel.findOne({_id: applicant.employee_id})
    const formattedFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
    const {status_message, status_subject} = leaveApplicationStatusMessage(formattedFirstName, status)
    const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${status_message}`
    EmailService.sendMail(leaveApplicant.company_email, "hr@outsourceglobal.com", status_subject, status_message, body)
  }
 
}
export default LeadsLeaveApplicationService;
