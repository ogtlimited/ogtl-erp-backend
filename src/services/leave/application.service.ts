/* eslint-disable prettier/prettier */

import { ILeaveApplication, ILeaveCount } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import {  CreateLeaveApplicationDTO, UpdateLeaveApplicationDTO } from '@/dtos/Leave/application.dto';
import applicationModel from '@/models/leave/application.model';
import allocationModel from '@/models/leave/allocation.model';
import EmployeeService from '@services/employee.service';
import LeadsLeaveApplicationService from '@services/leave/leads/leads_application.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import projectModel from '@/models/project/project.model';
import EmailService from '@/utils/email.service';
import { leadsLeaveNotificationMessage } from '@/utils/message';
const moment = require('moment')

class LeaveApplicationService {
  public application = applicationModel;
  public allocationM = allocationModel;
  public employeeS = new EmployeeService();
  public leadsLeaveApplicationService = new LeadsLeaveApplicationService();
  public employeeModel = EmployeeModel;
  private startOfYear = new Date(moment().startOf('year').toString()); 
  private endOfYear = new Date(moment().endOf('year').toString());
  public project = projectModel;

  public async findAllLeaveapplication(query): Promise<ILeaveApplication[]> {
    const application: ILeaveApplication[] = await this.application
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
    const application: ILeaveApplication[] = await this.application
      .find({employee_project_id : ClientId})
    return application;
  }
  public async findAllTeamMembersLeave(user): Promise<ILeaveApplication[]> {
    const leaveApplications = await this.application.find({ leave_approver: user._id });
    return leaveApplications;
  }
  public async findLeaveapplicationById(LeaveapplicationId: string): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationId)) throw new HttpException(400, "You're not LeaveapplicationId");
    const findLeaveapplication: ILeaveApplication = await this.application.findOne({ _id: LeaveapplicationId });
    if (!findLeaveapplication) throw new HttpException(404, 'Leave application not found');
    return findLeaveapplication;
  }
  public async createLeaveapplication(LeaveapplicationData: CreateLeaveApplicationDTO, user: Employee): Promise<ILeaveApplication> {
    const newLeaveapplicationData:ILeaveApplication = LeaveapplicationData
    newLeaveapplicationData.approval_level = await this.leadsLeaveApplicationService.getImmediateSupervisorsLeaveApprovalLevel(user)
    const usersLeaveApprovalLevel: number = await this.leadsLeaveApplicationService.getLeadLeaveApprovalLevel(user)
    if(usersLeaveApprovalLevel === newLeaveapplicationData.approval_level) newLeaveapplicationData.hr_stage = true
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, 'Bad request');
    const startDate = new Date(newLeaveapplicationData.from_date);
    const endDate = new Date(newLeaveapplicationData.to_date);
    const leave_period = await this.application.findOne(
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
    const prevLeaves: ILeaveApplication[] = await this.application.find({
      employee_id: LeaveapplicationData.employee_id,
      createdAt: {
        $gte: new Date(date.getFullYear().toString()),
      },
    });
    
    if (prevLeaves.length == 0) {
      const createLeaveapplicationData: ILeaveApplication = await this.application.create({...newLeaveapplicationData, employee_project_id: user.projectId});
      await this.sendPendingLeaveNotificationMail(LeaveapplicationData)
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
          await this.sendPendingLeaveNotificationMail(LeaveapplicationData)
          const createLeaveapplicationData: ILeaveApplication = await this.application.create({...newLeaveapplicationData, employee_project_id: user.projectId});
          return createLeaveapplicationData;
        }
      }
    }
  }
  public async updateLeaveapplication(LeaveapplicationId: string, LeaveapplicationData: UpdateLeaveApplicationDTO): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, 'Bad request');
    if (LeaveapplicationData._id) {
      const findLeaveapplication: ILeaveApplication = await this.application.findOne({ _id: LeaveapplicationData._id, acted_on: false});
      if (findLeaveapplication && findLeaveapplication._id != LeaveapplicationId)
        throw new HttpException(409, `${LeaveapplicationData._id} already exists`);
    }
    const updateLeaveapplicationById: ILeaveApplication = await this.application.findByIdAndUpdate(LeaveapplicationId, LeaveapplicationData, {
      new: true,
    });
    if (!updateLeaveapplicationById) throw new HttpException(404, 'leave does not exist');

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
    const deleteLeaveapplicationById: ILeaveApplication = await this.application.findByIdAndDelete(LeaveapplicationId);
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
    await this.application.updateMany(
      { status: 'active' },
      {
        $inc: { leaveCount: 24 },
      },
    );
  }
  public async getLeaveapplicationByEmployeeId(employee_id: string): Promise<ILeaveApplication[]> {
    if (isEmpty(employee_id)) throw new HttpException(400, "You're not LeaveapplicationId");
    const findLeaveapplication: ILeaveApplication[] = await this.application.find({ employee_id: employee_id }).populate("employee_id");
    if (!findLeaveapplication) throw new HttpException(404, 'Leave application not found');
    return findLeaveapplication;
  }
  // public async getTypesOfLeaveTaken(query): Promise<ILeaveApplication[]> {
  //   const getLeaveApplications: ILeaveApplication[] = await this.application.find({query}).populate("leave_type_id");
  //   const typesOfLeaveTaken = 
  //   return typesOfLeaveTaken;
  // }
  private async sendPendingLeaveNotificationMail(applicant){
    const leaveApplicant = await this.employeeModel.findOne({_id: applicant.employee_id})
    const formattedLeaveApplicantFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
    const supervisor = await this.employeeModel.findOne({_id: applicant?.leave_approver})
    const formattedSupervisorFirstName = supervisor.first_name.charAt(0) + supervisor.first_name.toLowerCase().slice(1)
    const {message, subject} = leadsLeaveNotificationMessage(formattedSupervisorFirstName, formattedLeaveApplicantFirstName) 
    const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
    // EmailService.sendMail(supervisor.company_email, "hr@outsourceglobal.com", subject, message, body)
    EmailService.sendMail("abubakarmoses@yahoo.com", "hr@outsourceglobal.com", subject, message, body)
  }
  private async validateLeaveDay(date: Date, employee_project_id: string): Promise<boolean> {
    const valid_status = "pending"  
    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth()+1
    const day = new Date(date).getDate()
    const leaves = await this.application.find({
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
