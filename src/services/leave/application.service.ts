/* eslint-disable prettier/prettier */

import { ILeaveApplication, ILeaveCount } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';

import { isEmpty } from '@utils/util';
import { CreateLeaveApplicationDTO, UpdateLeaveApplicationDTO } from '@/dtos/Leave/application.dto';
import applicationModel from '@/models/leave/application.model';
import leaveApprovalLevelModel from '@/models/leave/leave_approval_level.model';
import departmentModel from '@/models/department/department.model';
import allocationModel from '@/models/leave/allocation.model';
import EmployeeService from '@services/employee.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import projectModel from '@/models/project/project.model';

class LeaveApplicationService {
  public application = applicationModel;
  public allocationM = allocationModel;
  private leaveApprovalLevelModel = leaveApprovalLevelModel;
  private departmentModel = departmentModel;
  public employeeS = new EmployeeService();
  public employeeModel = EmployeeModel;
  constructor(){
    // this.updateAllLeaveCount()
  }
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

  public async supervisorApproveLeave(id: String, decision, user): Promise<ILeaveApplication> {
    const leaveApplication = await this.application.findOneAndUpdate(
      { _id: id, leave_approver: user._id, status: { $eq: 'open' } },
      {
        $set: { status: `${decision == 'true' ? 'approved by supervisor' : 'rejected by supervisor'}` },
      },
      { new: true },
    );
    if (!leaveApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
    return leaveApplication;
  }

  public async HrApproveLeave(id: String, decision, user): Promise<ILeaveApplication> {
    const currentApplication: any = await this.application.find({ _id: id });
    if (!currentApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
    const totalApplied = this.getBusinessDatesCount(new Date(currentApplication.from_date), new Date(currentApplication.to_date));
    const MaxLeave = Number(user.leaveCount);
    const leaveDiff = MaxLeave - totalApplied;
    await EmployeeModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: { leaveCount: leaveDiff },
      },
    );
    const leaveApplication = await this.application.findOneAndUpdate(
      { _id: id, status: { $eq: 'approved by supervisor' } },
      {
        $set: { status: `${decision == 'true' ? 'approved' : 'rejected'}` },
      },
      { new: true },
    );
    return leaveApplication;
  }

  public async HrRejectLeave(id: String): Promise<ILeaveApplication> {
    const leaveApplication = await this.application.findOneAndUpdate(
      { _id: id, status: { $eq: 'approved by supervisor' } },
      {
        $set: { status: 'rejected' },
      },
      { new: true },
    );

    if (!leaveApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
    return leaveApplication;
  }

  public async findLeaveapplicationById(LeaveapplicationId: string): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationId)) throw new HttpException(400, "You're not LeaveapplicationId");

    const findLeaveapplication: ILeaveApplication = await this.application.findOne({ _id: LeaveapplicationId });
    if (!findLeaveapplication) throw new HttpException(409, 'Leave application not found');

    return findLeaveapplication;
  }

  public async findLeaveapplicationByEmployeeId(LeaveapplicationId: string): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationId)) throw new HttpException(400, "You're not LeaveapplicationId");

    const findLeaveapplication: ILeaveApplication = await this.application.findOne({ _id: LeaveapplicationId });
    if (!findLeaveapplication) throw new HttpException(409, 'Leave application not found');

    return findLeaveapplication;
  }

  public async createLeaveapplication(LeaveapplicationData: ILeaveApplication, user): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, 'Bad request');
    const startDate = new Date(LeaveapplicationData.from_date);
    const endDate = new Date(LeaveapplicationData.to_date);
    const leave_period = await this.application.findOne(
      // {$and:[{_id: LeaveapplicationData.employee_id}, {createdAt:{$gte:startDate,$lt:endDate}},{status:{$ne: "rejected"}}]})
      {employee_id: LeaveapplicationData.employee_id, createdAt:{$gte:startDate,$lt:endDate},status:{$ne: "rejected"}})
    if(leave_period) throw new HttpException(400, 'Your leave is being processed')
    if (startDate > endDate) throw new HttpException(400, 'Leave end date must be greater than end date');
    const date = new Date();
    // const user: Employee = await this.employeeS.findEmployeeById(LeaveapplicationData.employee_id)
    const MaxLeave = Number(user.leaveCount);
    // LeaveapplicationData.employee_id = user._id;
    const totalApplied = this.getBusinessDatesCount(new Date(LeaveapplicationData.from_date), new Date(LeaveapplicationData.to_date));
    if (MaxLeave < totalApplied) {
      throw new HttpException(400, 'total leave days exceed available leaves');
    };


    const monthAfterOnboarding = this.monthDiff(new Date(user.date_of_joining), new Date());
    // if(user)
    if (totalApplied > 12) {
      throw new HttpException(400, 'You can apply for more than 12 working days');
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
      // console.log(prevLeaves)
      
      const createLeaveapplicationData: ILeaveApplication = await this.application.create({...LeaveapplicationData, employee_project_id: user.projectId});
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
          const createLeaveapplicationData: ILeaveApplication = await this.application.create({...LeaveapplicationData, employee_project_id: user.projectId});
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
    if (!updateLeaveapplicationById) throw new HttpException(409, 'leave does not exist');

    return updateLeaveapplicationById;
  }
  public async updateLeaveCount(updatedLeaveCount: ILeaveCount[]) {
    try {
      // const salaryDetailsData = req.body;
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
      // console.log(newArray);
      // const results = await EmployeeModel.updateMany({type: '_id'}, newArray)
      // await EmployeeModel.updateMany({_id: {$in: [...newArray['employee_id']]}},{$set: {leaveCount: {$in: [...]}}})

      // console.log(results)
      // res.status(201).json({ data: results, message: 'ContactDetails succesfully created' });
    } catch (error) {
      console.log(error);
    }
  }
  public async updateAllLeaveCount(){
    return EmployeeModel.updateMany({}, {$inc : {'leaveCount' : 2}});
  }

  public async deleteLeaveapplication(LeaveapplicationId: string): Promise<ILeaveApplication> {
    const deleteLeaveapplicationById: ILeaveApplication = await this.application.findByIdAndDelete(LeaveapplicationId);
    if (!deleteLeaveapplicationById) throw new HttpException(409, 'shift does not exist');

    return deleteLeaveapplicationById;
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
  public async getLeaveApplicationsForLeads(user): Promise<ILeaveApplication[]> {
    const teamLeadsApprovalLevel = await this.getLeadsApprovalLevel(user)
    const leaveApplications = await this.application.find({ leave_approver: user._id, approval_level:teamLeadsApprovalLevel,hr_stage:{$ne: true}});
    return leaveApplications;
  }
  public async approveLeadsLeaveApplications(leaveId: String, user): Promise<ILeaveApplication> {
    const departmentHighestLeaveApprovalLevel = await this.getDepartmentHighestLeaveApprovalLevel(user)
    const leadsApprovalLevel = await this.getLeadsApprovalLevel(user)
    console.log("leadsApprovalLevel", leadsApprovalLevel)
    console.log("departmentHighestLeaveApprovalLevel", departmentHighestLeaveApprovalLevel)
    const leaveApplication = await this.application.findOneAndUpdate(
      { _id: leaveId, leave_approver: user._id, status: { $eq: 'pending' } },
      {
        $set: { 
          leave_approver: leadsApprovalLevel === departmentHighestLeaveApprovalLevel ? user._id : user.reports_to,
          hr_stage: leadsApprovalLevel === departmentHighestLeaveApprovalLevel ? true : false,
          acted_on: true
      },
         $inc: { approval_level: leadsApprovalLevel === departmentHighestLeaveApprovalLevel ? 0 : 1 },
     },
      { new: true },
    );
    if (!leaveApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
    return leaveApplication;
  }
  public async rejectLeadsLeaveApplications(leaveId: String, user, query): Promise<ILeaveApplication> {
    const leaveApplication = await this.application.findOneAndUpdate(
      { _id: leaveId, leave_approver: user._id, status: { $eq: 'pending' } },
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
    return leaveApplication;
  }
  public async getLeaveApplicationsForHr(): Promise<ILeaveApplication[]> {
    const leaveApplicationsForHr = await this.application.find({ hr_stage: true, status: "pending"});
    return leaveApplicationsForHr;
  }
  public async approveHrLeaveApplications(leaveId: string): Promise<ILeaveApplication[]> {
    const leaveApplication: any = await this.application.findOneAndUpdate(
      { _id: leaveId, hr_stage: true, status: { $eq: 'pending' } },
      {
        $set: { 
          status: "approved"
        }
      },
      { new: true }
    );
    if (!leaveApplication) {
      throw new HttpException(400, 'leave application does not exist');
    }
    const leaveApplicationBusinessdays = this.getBusinessDatesCount(leaveApplication.from_date, leaveApplication.to_date)
    const employeesRecords = await this.employeeModel
    .findOneAndUpdate({_id: leaveApplication.employee_id},
      {
        $inc: { 
          leaveCount: -leaveApplicationBusinessdays
        }
      },
      { new: true })
    return leaveApplication;
  }
  public async rejectHrLeaveApplications(leaveId: string): Promise<ILeaveApplication[]> {
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
    return leaveApplication;
  }
  private async getDepartmentHighestLeaveApprovalLevel(user): Promise<any>{
    const departmentRecord: any = await this.departmentModel.findOne({_id: user.department})
    return await departmentRecord.leave_approval_level
  }
  private async getLeadsApprovalLevel(user): Promise<any>{
    const leaveApprovalLevelRecord: any = await this.leaveApprovalLevelModel.findOne({designation_id: user.designation})
    return await leaveApprovalLevelRecord.approval_level
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
