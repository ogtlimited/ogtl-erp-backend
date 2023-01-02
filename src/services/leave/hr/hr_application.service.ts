/* eslint-disable prettier/prettier */
import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';
import applicationModel from '@/models/leave/application.model';
import allocationModel from '@/models/leave/allocation.model';
import EmployeeService from '@services/employee.service';
import LeaveFiltrationService from '@/services/leave/leave_filtration.service';
import LeaveMailingService from '@services/leave/leave_mailing.service';
import EmployeeModel from '@models/employee/employee.model';
import projectModel from '@/models/project/project.model';

class HrLeaveApplicationService {
  public application = applicationModel;
  public allocationM = allocationModel;
  public employeeS = new EmployeeService();
  public filtrationService = new LeaveFiltrationService();
  public leaveMailingService = new LeaveMailingService();
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
    Promise.all(
      [this.leaveMailingService
      .sendLeaveStatusNotificationMail(leaveApplication, "approved", this.employeeModel)
    ])
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
     Promise.all([this.leaveMailingService.sendLeaveStatusNotificationMail(leaveApplication, "rejected",this.employeeModel)])
    return leaveApplication;
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
      let data = {rejected:0,approved:0,pending:0}
      const leaveCount = await this.application.aggregate([
      {
          '$match': {hr_stage: true}
      },
      {'$group': {
            '_id': '$status', 
            'total': {
              '$count': {}
            }
          }
      }
    ])
    leaveCount.map<any>(status=>{
      if (status._id==="rejected"){ data.rejected = status.total}
      if (status._id==="pending"){ data.pending = status.total}
      if (status._id==="approved"){ data.approved = status.total}
    })
    return data
  }
  public async getTypesOfLeaveTaken(): Promise<ILeaveApplication[]> {
      const typesOfLeaveTaken: ILeaveApplication[] = await this.application.aggregate([
      {
          '$match': {hr_stage: true}
      },
      {$lookup:{
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
      { '$group': {
            '_id': '$leavetype.leave_type', 
            'total': {
              '$count': {}
            }
          }
      }
    ])
      return typesOfLeaveTaken;
    }
  public async getLeaveApplicationHistory(): Promise<ILeaveApplication[]> {
    const leaveApplications: ILeaveApplication[] = await this.application.find(
      { hr_stage: true, status:{$ne: "pending"} })
    return leaveApplications
  }
}
export default HrLeaveApplicationService;
