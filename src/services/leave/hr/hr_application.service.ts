/* eslint-disable prettier/prettier */
import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';
import applicationModel from '@/models/leave/application.model';
import leaveTypeModel from '@/models/leave/leave_type.model';
import allocationModel from '@/models/leave/allocation.model';
import EmployeeService from '@services/employee.service';
import LeaveFiltrationService from '@/services/leave/leave_filtration.service';
import LeaveMailingService from '@services/leave/leave_mailing.service';
import EmployeeModel from '@models/employee/employee.model';
import projectModel from '@/models/project/project.model';
import { Employee } from '@/interfaces/employee-interface/employee.interface';

class HrLeaveApplicationService {
  public application = applicationModel;
  public leaveTypeModel = leaveTypeModel;
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
  public async getLeaveApplicationHistory(query): Promise<ILeaveApplication[]> {
    let matchBy = { hr_stage: true, status: { $ne: "pending" } }
    const leaveApplications = await this.filtrationService.getLeaveApplicationsHelperMethod(matchBy, query, this.application)
    return leaveApplications
  };
  public async getEmployeesBasedOnLeaveTypesTaken(query): Promise<ILeaveApplication[]> {
    const leaveType = await this.leaveTypeModel.findOne({leave_type: query.leave_type})
    const leaveApplications: ILeaveApplication[] = await this.application.find(
      {
      status: "approved",
      leave_type_id: leaveType?._id,
      createdAt: { $gte: new Date(query.from), $lte: new Date(query.to) }
     })
      .populate([{
        path: 'employee_id',
        populate: [{
          path: 'department',
        },{
          path: 'designation',
        }] 
        },
        { 
          path: 'leave_type_id' 
        } 
        ])
    return leaveApplications
  };
  public async getEmployeesBasedOnLeaveStatus(query): Promise<ILeaveApplication[]> {
    const leaveApplications: ILeaveApplication[] = await this.application.find(
      {
        createdAt: { $gte: new Date(query.from), $lte: new Date(query.to)},
        hr_stage: true,
        status: query.status
      })
      .populate([{
        path: 'employee_id',
        populate: [{
          path: 'department',
        }, {
          path: 'designation',
        }]
      },
      { 
        path: 'leave_type_id' 
      }
      ])
    return leaveApplications
  };
  public async generateLeaveReport(query): Promise<any> {
    const fromDate = query.from;
    const toDate = query.to;
    let data = { rejected: 0, approved: 0, pending: 0 }
    const leaveReport = await this.application.aggregate([{
      $facet: {
        typesOfLeaveTaken: [{
          '$match': { hr_stage: true, createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate)}  }
        },
        {
          $lookup: {
            from: "leavetypes",
            localField: "leave_type_id",
            foreignField: "_id",
            as: "leavetype"
          }
        },
        {
          $unwind: {
            path: "$leavetype",
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
        }],
        leaveStatusCount: [{
          '$match': {
            hr_stage: true, createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) }}
        },
        {
          '$group': {
            '_id': '$status',
            'total': {
              '$count': {}
            }
          }
        }]
      }
  }])
    const leaveStatusCount = leaveReport.find(report => report).leaveStatusCount
    const typesOfLeaveTaken = leaveReport.find(report => report).typesOfLeaveTaken
    leaveStatusCount.map(status => {
        if (status._id === "rejected") { data.rejected = status.total }
        if (status._id === "pending") { data.pending = status.total }
        if (status._id === "approved") { data.approved = status.total }
      
    })
    return {leaveStatus: data, typesOfLeaveTaken}
  }
}
export default HrLeaveApplicationService;
