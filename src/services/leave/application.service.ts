/* eslint-disable prettier/prettier */

import { ILeaveApplication, ILeaveCount } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import {  CreateLeaveApplicationDTO, UpdateLeaveApplicationDTO } from '@/dtos/Leave/application.dto';
import applicationModel from '@/models/leave/application.model';
import leaveTypeModel from '@/models/leave/leave_type.model';
import LeadsLeaveApplicationService from '@services/leave/leads/leads_application.service';
import LeaveMailingService from '@services/leave/leave_mailing.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import projectModel from '@/models/project/project.model';

class LeaveApplicationService {
  private leaveApplicationModel = applicationModel;
  private leaveTypeModel = leaveTypeModel;
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
    newLeaveapplicationData.first_approver = user.reports_to
    newLeaveapplicationData.approval_level = await this.leadsLeaveApplicationService.getImmediateSupervisorsLeaveApprovalLevel(user)
    const leave_type = await this.leaveTypeModel.findOne({ leave_type: /^Emergency Leave$/i})
    console.log("Leave type id", leave_type._id)
    console.log("Payload Leave type id", newLeaveapplicationData.leave_type_id)
    const usersLeaveApprovalLevel: number = await this.leadsLeaveApplicationService.getLeadLeaveApprovalLevel(user)
    if(usersLeaveApprovalLevel === newLeaveapplicationData.approval_level) newLeaveapplicationData.hr_stage = true
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, 'Bad request');
    const today = new Date();
    const noticePeriod = today.setDate(today.getDate() + 14);
    const startDate = new Date(newLeaveapplicationData.from_date);
    const endDate = new Date(newLeaveapplicationData.to_date);
    const leave_period = await this.leaveApplicationModel.findOne(
      { employee_id: newLeaveapplicationData.employee_id, createdAt: { $gte: new Date(today.getFullYear().toString()) },status:{$ne: "rejected"}})
    if (newLeaveapplicationData.leave_type_id !== leave_type._id.toString() && startDate < new Date(noticePeriod)) throw new HttpException(400, 'Your noticed period must be 14 days')
    if(leave_period) throw new HttpException(400, 'Your leave is being processed')
    if (startDate > endDate) throw new HttpException(400, 'Leave end date must be greater than start date');
    const date = new Date();
    const MaxLeave = Number(user.leaveCount);
    const totalApplied = this.getBusinessDatesCount(new Date(newLeaveapplicationData.from_date), new Date(newLeaveapplicationData.to_date));
    if (MaxLeave < totalApplied) {
      throw new HttpException(400, 'total leave days exceed available leaves');
    };
    const monthAfterOnboarding = this.monthDiff(new Date(user.date_of_joining), new Date());
    if (totalApplied > 14) {
      throw new HttpException(400, 'You cannot apply for more than 14 working days');
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
    const updateLeaveapplicationById: ILeaveApplication = await this.leaveApplicationModel.findByIdAndUpdate({_id: LeaveapplicationId}, newLeaveapplicationData, {
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
  public async getLeaveApplicationProgress(user): Promise<any> {
    const leaveapplication: ILeaveApplication = await this.leaveApplicationModel.findOne({employee_id: user._id });
    const list_of_approvers = leaveapplication?.list_of_approvers
    const allLeaveapprovers: any = await this.getAllLeaveAprovers(user);
    let progressObj = {}
    for (let approver in allLeaveapprovers){
      if (list_of_approvers?.indexOf(allLeaveapprovers[approver].toString()) > -1){
         progressObj[approver] = "done" 
      }
      else{
         progressObj[approver] = "not done"
      } 
    }
      if (leaveapplication.status !== "approved"){ progressObj["HR"] = "not done" }
      else{ progressObj["HR"] = "done" }
    return progressObj
  }
  public async getAllLeaveAprovers(user): Promise<any> {
    const leaveapplication: ILeaveApplication = await this.leaveApplicationModel.findOne({employee_id: user._id});
    if (!leaveapplication) throw new HttpException(404, 'Leave application not found');
    let leaveApprover = leaveapplication?.first_approver
    let leaveApproversObj = {}
    while (leaveApprover !== null ){
      const findEmployee = await this.employeeModel.findOne({ _id: leaveApprover })
      leaveApprover = findEmployee?.reports_to
      leaveApproversObj[findEmployee?.first_name] = findEmployee?._id
    }
    return leaveApproversObj;
  }
  public async appealRejectedLeave(query, body, user): Promise<void> {
    const leaveApplications = await this.leaveApplicationModel.findOne(query).populate("employee_id").populate("leave_approver")
    if (leaveApplications){
      await this.leaveApplicationModel.findOneAndUpdate(query,{$set:{
        isAppealled: true,
        status: "pending"
      }})
    }
    const leaveApplicantFirstName = leaveApplications?.employee_id?.first_name.charAt(0) + leaveApplications?.employee_id?.first_name.toLowerCase().slice(1)
    const leaveApplicantLastName = leaveApplications?.employee_id?.last_name.charAt(0) + leaveApplications?.employee_id?.last_name.toLowerCase().slice(1)
    const leaveApplicantFullName = `${leaveApplicantFirstName} ${leaveApplicantLastName}`
    const leaveApproverFirstName = leaveApplications?.leave_approver?.first_name.charAt(0) + leaveApplications?.leave_approver?.first_name.toLowerCase().slice(1)
    const leaveApproverLastName = leaveApplications?.leave_approver?.last_name.charAt(0) + leaveApplications?.leave_approver?.last_name.toLowerCase().slice(1)
    const leaveApproverFullName = `${leaveApproverFirstName} ${leaveApproverLastName}`
    const leaveApproverEmail = leaveApplications?.leave_approver?.company_email
    const topLeads = await this.employeeModel.findOne({ _id: leaveApplications?.leave_approver?.reports_to })
    const topLeadsEmail = topLeads?.company_email
    const topLeadsFirstName = topLeads?.first_name.charAt(0) + topLeads?.first_name.toLowerCase().slice(1)
    if (leaveApplications?.leave_approver !== null){
      Promise.all([this.leaveMailingService.appealRejectedLeaveMailToLead(leaveApproverFirstName, leaveApplicantFullName, leaveApplications?.employee_id?.ogid, body.reasons, leaveApproverEmail)])}
    if (topLeads!==null){
      Promise.all([this.leaveMailingService.appealRejectedLeaveMailToTopLead(leaveApproverFullName, topLeadsFirstName, leaveApplicantFullName, leaveApplications?.employee_id?.ogid, body.reasons, topLeadsEmail)])
    } 
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
