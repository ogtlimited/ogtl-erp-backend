/* eslint-disable prettier/prettier */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';
import applicationModel from '@/models/leave/application.model';
import allocationModel from '@/models/leave/allocation.model';
import EmployeeService from '@services/employee.service';
import FiltrationService from '@services/leave/filtration.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import projectModel from '@/models/project/project.model';
import EmailService from '@/utils/email.service';
import { leaveApplicationStatusMessage } from '@/utils/message';

class HrLeaveApplicationService {
  public application = applicationModel;
  public allocationM = allocationModel;
  public employeeS = new EmployeeService();
  public filtrationService = new FiltrationService();
  public employeeModel = EmployeeModel;
  public project = projectModel;
  private today = new Date();

    public async getLeaveApplicationsForHr(query:any ): Promise<ILeaveApplication[]> {
    let matchBy = { hr_stage: true, status: "pending"}
    const leaveApplications= await this.filtrationService.getLeaveApplicationsHelperMethod(matchBy, query, this.application)
    return leaveApplications;
  }
  public async approveLeaveApplicationsByHr(leaveId: string): Promise<ILeaveApplication[]> {
    const leaveApplication: any = await this.application.findOneAndUpdate(
      { _id: leaveId, hr_stage: true, status: { $eq: 'pending' } },
      {
        $set: { 
          status: "approved",
          acted_on: true,
        }
      },
      { new: true }
    );
    if (!leaveApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
    await this.updateTotalLeaveCount(leaveApplication)
    Promise.all([this.sendLeaveStatusNotificationMail(leaveApplication, "approved")])
    return leaveApplication;
  }
  public async rejectLeaveApplicationsByHr(leaveId: string): Promise<ILeaveApplication[]> {
    const leaveApplication: any = await this.application.findOneAndUpdate(
      { _id: leaveId, hr_stage: true, status: { $eq: 'pending' } },
      {
        $set: { 
          status: "rejected"
        }
      },
      { new: true }
    );
    if (!leaveApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
     Promise.all([this.sendLeaveStatusNotificationMail(leaveApplication, "rejected")])
    return leaveApplication;
  }
  private async sendLeaveStatusNotificationMail(applicant, status){
    const leaveApplicant = await this.employeeModel.findOne({_id: applicant.employee_id})
    const formattedFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
    const {status_message, status_subject} = leaveApplicationStatusMessage(formattedFirstName, status)
    const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${status_message}`
    // EmailService.sendMail(leaveApplicant.company_email, "hr@outsourceglobal.com", status_subject, status_message, body)
    EmailService.sendMail("abubakarmoses@yahoo.com", "hr@outsourceglobal.com", status_subject, status_message, body)
  }
  private async updateTotalLeaveCount(leaveApplication){
    const leaveApplicationBusinessdays = this.getBusinessDatesCount(leaveApplication.from_date, leaveApplication.to_date)
    await this.employeeModel.findOneAndUpdate({_id: leaveApplication.employee_id},
      {
        $inc: { 
          leaveCount: -leaveApplicationBusinessdays
        }
      },
      { new: true })
  }
  public getBusinessDatesCount(startDate, endDate) {
      let count = 0;
      const curDate = new Date(startDate.getTime());
      while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if (!(dayOfWeek in [0, 6])) count++;
        curDate.setDate(curDate.getDate() + 1);
      }
      return count;
  }
  public async countEmployeesOnLeave(): Promise<number>{
      const matchBy = {
        hr_stage: true, status:"approved",
        to_date:{$gte:this.today}
        }
      const employeesOnLeave: number = await this.application.find(matchBy).countDocuments()
      return employeesOnLeave
  }
  public async getLeaveStatusCountForHrDashboardAnalytics() {
      const leaveCount = await this.application.aggregate([
      {
          '$match': {hr_stage: true}
      },
      {
          '$group': {
            '_id': '$status', 
            'total': {
              '$count': {}
            }
          }
      }
    ])
    return leaveCount
  }
  public async getTypesOfLeaveTaken(): Promise<ILeaveApplication[]> {
      const typesOfLeaveTaken: ILeaveApplication[] = await this.application.aggregate([
      {
          '$match': {status: "approved"}
      },
      {
        $lookup:{
          from: "leavetypes",
          localField: "leave_type_id",
          foreignField: "_id",
          as: "leavetype"
          }
      },
      {
        $unwind: {path :"$leavetype",
        preserveNullAndEmptyArrays: true
      }
      },
      {
          '$group': {
            '_id': '$leavetype.leave_type', 
            'total': {
              '$count': {}
            }
          }
      }
    ])
      return typesOfLeaveTaken;
    }
}
export default HrLeaveApplicationService;
