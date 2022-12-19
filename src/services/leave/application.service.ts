/* eslint-disable prettier/prettier */

import { ILeaveApplication, ILeaveCount } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import {  CreateLeaveApplicationDTO, UpdateLeaveApplicationDTO } from '@/dtos/Leave/application.dto';
import applicationModel from '@/models/leave/application.model';
import LeadsLeaveApplicationService from '@services/leave/leads/leads_application.service';
import LeaveMailingService from '@services/leave/leave_mailing.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import projectModel from '@/models/project/project.model';

class LeaveApplicationService {
  private leaveApplicationModel = applicationModel;
  private leadsLeaveApplicationService = new LeadsLeaveApplicationService();
  private leaveMailingService = new LeaveMailingService();
  private employeeModel = EmployeeModel;
  private project = projectModel;

  public async findAllLeaveapplication(query): Promise<ILeaveApplication[]> {
    const application: ILeaveApplication[] = await this.leaveApplicationModel
      .find(query)
      .populate({
        path: 'employee_id',
        model: 'Employee',
        populate: {
          path: 'designation',
          model: 'Designation',
        },
      })
      .populate({
        path: 'leave_approver',
        model: 'Employee',
        populate: {
          path: 'designation',
          model: 'Designation',
        },
      }).populate({
        path:'project_id',
        model : 'Project'
            });
    return application;
  }
  public async findAllLeaveapplicationsClient(ClientId: string): Promise<ILeaveApplication[]> {
    const application: ILeaveApplication[] = await this.leaveApplicationModel
      .find({employee_project_id : ClientId})
    return application;
  }
  public async findAllTeamMembersLeave(user): Promise<ILeaveApplication[]> {
    const leaveApplications = await this.leaveApplicationModel.find({ leave_approver: user._id });
    return leaveApplications;
  }
  public async findLeaveapplicationById(LeaveapplicationId: string): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationId)) throw new HttpException(400, "You're not LeaveapplicationId");
    const findLeaveapplication: ILeaveApplication = await (await this.leaveApplicationModel.findOne({ _id: LeaveapplicationId })).populate("leave_type_id");
    if (!findLeaveapplication) throw new HttpException(404, 'Leave application not found');
    return findLeaveapplication;
  }
  public async createLeaveapplication(LeaveapplicationData: CreateLeaveApplicationDTO, user: Employee): Promise<ILeaveApplication> {
    let newLeaveapplicationData:ILeaveApplication = LeaveapplicationData
    newLeaveapplicationData.department_id = user.department
    newLeaveapplicationData.employee_id = user._id
    newLeaveapplicationData.leave_approver = user.reports_to
    newLeaveapplicationData.project_id = user.projectId
    newLeaveapplicationData.approval_level = await this.leadsLeaveApplicationService.getImmediateSupervisorsLeaveApprovalLevel(user)
    const usersLeaveApprovalLevel: number = await this.leadsLeaveApplicationService.getLeadLeaveApprovalLevel(user)
    if(usersLeaveApprovalLevel === newLeaveapplicationData.approval_level) newLeaveapplicationData.hr_stage = true
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, 'Bad request');
    const startDate = new Date(newLeaveapplicationData.from_date);
    const endDate = new Date(newLeaveapplicationData.to_date);
    const leave_period = await this.leaveApplicationModel.findOne(
      {employee_id: newLeaveapplicationData.employee_id, createdAt:{$gte:startDate,$lt:endDate},status:{$ne: "rejected"}})
    if(leave_period) throw new HttpException(400, 'Your leave is being processed')
    if (startDate > endDate) throw new HttpException(400, 'Leave end date must be greater than start date');
    const date = new Date();
    const MaxLeave = Number(user.leaveCount);
    const totalApplied = this.getBusinessDatesCount(new Date(newLeaveapplicationData.from_date), new Date(newLeaveapplicationData.to_date));
    if (MaxLeave < totalApplied) {
      throw new HttpException(400, 'total leave days exceed available leaves');
    };
    const monthAfterOnboarding = this.monthDiff(new Date(user.date_of_joining), new Date());
    if (totalApplied > 12) {
      throw new HttpException(400, 'You cannot apply for more than 12 working days');
    }

    if (monthAfterOnboarding == 0) {
      throw new HttpException(400, 'You can only apply exactly one month after onboarding');
    }
    const prevLeaves: ILeaveApplication[] = await this.leaveApplicationModel.find({
      employee_id: newLeaveapplicationData.employee_id,
      createdAt: {
        $gte: new Date(date.getFullYear().toString()),
      },
    });
    
    if (prevLeaves.length == 0) {
      const createLeaveapplicationData: ILeaveApplication = await this.leaveApplicationModel.create({...newLeaveapplicationData, employee_project_id: user.projectId});
      newLeaveapplicationData.leave_approver!==null ? Promise.all([this.leaveMailingService.sendPendingLeaveNotificationMail(newLeaveapplicationData, this.employeeModel)]):""
      return createLeaveapplicationData;
    } else {
      const getLeaveDays = prevLeaves.map(e => this.getBusinessDatesCount(new Date(e.from_date), new Date(e.to_date)));
      const totalLeaveThisYear = getLeaveDays.reduce((previousValue, currentValue) => previousValue + currentValue);
      const oldAndNewLeave = totalApplied + totalLeaveThisYear;
      const validateLeaveDay = await this.validateLeaveDay(LeaveapplicationData.from_date, user.projectId)
      if(validateLeaveDay === false ) {
        throw new HttpException(400, 'This leave day is not available');
      }
      if (totalLeaveThisYear > MaxLeave) {
        throw new HttpException(400, 'You have exceeded your total alloted leave');
      } else {
        if (oldAndNewLeave > MaxLeave) {
          throw new HttpException(400, 'You have used ' + totalLeaveThisYear + ', you have ' + (MaxLeave - totalLeaveThisYear) + ' leave left');
        } else {
          newLeaveapplicationData.leave_approver!==null ? Promise.all([this.leaveMailingService.sendPendingLeaveNotificationMail(newLeaveapplicationData, this.employeeModel)]):""
          const createLeaveapplicationData: ILeaveApplication = await this.leaveApplicationModel.create({...newLeaveapplicationData, employee_project_id: user.projectId});
          return createLeaveapplicationData;
        }
      }
    }
  }
  public async updateLeaveapplication(LeaveapplicationId: string, LeaveapplicationData: UpdateLeaveApplicationDTO): Promise<ILeaveApplication> {
    let newLeaveapplicationData:ILeaveApplication = LeaveapplicationData
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, 'Bad request');
    if (LeaveapplicationId) {
      const findLeaveapplication: ILeaveApplication = await this.leaveApplicationModel.findOne({ _id: LeaveapplicationId, acted_on: false});
      if (findLeaveapplication && findLeaveapplication._id != LeaveapplicationId)
        throw new HttpException(404, `${newLeaveapplicationData._id} does not exists`);
    }
    const updateLeaveapplicationById: ILeaveApplication = await this.leaveApplicationModel.findByIdAndUpdate({_id: newLeaveapplicationData}, newLeaveapplicationData, {
      new: true,
    });
    return updateLeaveapplicationById;
  }
  public async updateLeaveCount(updatedLeaveCount: ILeaveCount[]) {
    try {
      const newArray = [];
      for (let index = 0; index < updatedLeaveCount.length; index++) {
        const findEmployee: Employee = await EmployeeModel.findOneAndUpdate(
          { ogid: updatedLeaveCount[index].ogid },
          { $set: { leaveCount: updatedLeaveCount[index].leaveCount } },
        );
        if (findEmployee) {
          newArray.push(findEmployee);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async updateAllLeaveCount(){
    return EmployeeModel.updateMany({}, {$inc : {'leaveCount' : 2}});
  }
  public async deleteLeaveapplication(LeaveapplicationId: string): Promise<ILeaveApplication> {
    const deleteLeaveapplicationById: ILeaveApplication = await this.leaveApplicationModel.findByIdAndDelete(LeaveapplicationId);
    if (!deleteLeaveapplicationById) throw new HttpException(404, 'shift does not exist');
    return deleteLeaveapplicationById;
  }
  private getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (!(dayOfWeek in [0, 6])) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }
  public monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear());
  }

  public async addLeavesForEmployees(): Promise<void> {
    await this.leaveApplicationModel.updateMany(
      { status: 'active' },
      {
        $inc: { leaveCount: 24 },
      },
    );
  }
  public async getLeaveApplication(query): Promise<ILeaveApplication[]> {
      const findLeaveapplication: ILeaveApplication[] = await this.leaveApplicationModel.find(query).populate("employee_id").populate("leave_type_id");
      if (!findLeaveapplication) throw new HttpException(404, 'Leave application not found');
      return findLeaveapplication;
  }
  private async validateLeaveDay(date: Date, employee_project_id: string): Promise<boolean> {
    const valid_status = "pending"  
    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth()+1
    const day = new Date(date).getDate()
    const leaves = await this.leaveApplicationModel.find({
      "employee_project_id": employee_project_id,
      $expr: {
        $and: [
          {
            "$eq": [
              {
                "$month": "$from_date"
              },
              month
            ]
          },
          {
            "$eq": [
              {
                "$year": "$from_date"
              },
              year
            ]
          }
        ]
      },
      status:{
        $ne: "rejected"
      }
    })
    if(leaves.length === 0){
      return true
    }
    const sortByLatestDate = leaves.sort((a, b) => {
      return new Date(a.from_date).valueOf() - new Date(b.from_date).valueOf()
    })
    const getDayOfLatest = sortByLatestDate[sortByLatestDate.length - 1].from_date
    const getLeaveCap = await this.findProjectLeaveCap(employee_project_id)
    return (day - new Date(getDayOfLatest).getDate() > 0 && sortByLatestDate.length < Number(getLeaveCap))
  }

  private async findProjectLeaveCap(projectId: string){
    const findProject = await this.project.findOne({_id: projectId}).select('leave_cap -_id');
    if(findProject){
      return findProject.leave_cap
    }
    return 2
  }
}
export default LeaveApplicationService;
