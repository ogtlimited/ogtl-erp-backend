/* eslint-disable prettier/prettier */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';


import { isEmpty } from '@utils/util';
import { CreateLeaveApplicationDTO, UpdateLeaveApplicationDTO } from '@/dtos/Leave/application.dto';
import applicationModel from '@/models/leave/application.model';
import  allocationModel  from '@/models/leave/allocation.model';
import  EmployeeService  from '@services/employee.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import EmployeeModel from "@models/employee/employee.model";
import leaveCount from './leave.json'
class LeaveApplicationService {
  public application = applicationModel;
  public allocationM = allocationModel;
  public employeeS = new EmployeeService();

  public async findAllLeaveapplication(): Promise<ILeaveApplication[]> {
    const application: ILeaveApplication[] = await this.application.find().populate({
      path: 'employee_id',
      model: 'Employee',
      populate: {
          path: 'designation',
          model: 'Designation'
      }
  })
  .populate({
    path: 'leave_approver',
    model: 'Employee',
    populate: {
        path: 'designation',
        model: 'Designation'
    }
});
    return application;
  }

  public async findAllTeamMembersLeave(user): Promise<ILeaveApplication[]> {
    const leaveApplications = await this.application.find({leave_approver: user._id})
    return leaveApplications;
  }

  public async supervisorApproveLeave(id: String, decision, user): Promise<ILeaveApplication> {
    const leaveApplication = await this.application.findOneAndUpdate({_id: id, leave_approver: user._id, status: {$eq: "open"}}, {
      $set: {status: `${decision == "true" ? 'approved by supervisor': 'rejected by supervisor'}`}
    }, {new: true})
    if(!leaveApplication){
      throw new HttpException(400, "leave application does not exist")
    }
    return leaveApplication;
  }

  public async HrApproveLeave(id: String, decision): Promise<ILeaveApplication> {
    const leaveApplication = await this.application.findOneAndUpdate({_id: id,  status: {$eq: "approved by supervisor"}}, {
      $set: {status: `${decision == "true" ? 'approved': 'rejected'}`}
    }, {new: true})

    if(!leaveApplication){
      throw new HttpException(400, "leave application does not exist")
    }
    return leaveApplication;
  }

  public async HrRejectLeave(id: String): Promise<ILeaveApplication> {
    const leaveApplication = await this.application.findOneAndUpdate({_id: id,  status: {$eq: "approved by supervisor"}}, {
      $set: {status: 'rejected'}
    }, {new: true})

    if(!leaveApplication){
      throw new HttpException(400, "leave application does not exist")
    }
    return leaveApplication;
  }

  public async findLeaveapplicationById(LeaveapplicationId: string): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationId)) throw new HttpException(400, "You're not LeaveapplicationId");

    const findLeaveapplication: ILeaveApplication = await this.application.findOne({ _id: LeaveapplicationId });
    if (!findLeaveapplication) throw new HttpException(409, "Leave application not found");

    return findLeaveapplication;
  }

  public async findLeaveapplicationByEmployeeId(LeaveapplicationId: string): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationId)) throw new HttpException(400, "You're not LeaveapplicationId");

    const findLeaveapplication: ILeaveApplication = await this.application.findOne({ _id: LeaveapplicationId });
    if (!findLeaveapplication) throw new HttpException(409, "Leave application not found");

    return findLeaveapplication;
  }

  public async createLeaveapplication(LeaveapplicationData: ILeaveApplication, user): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, "Bad request");
    const startDate = new Date(LeaveapplicationData.from_date)
    const endDate = new Date(LeaveapplicationData.to_date)
    if(startDate > endDate) throw new HttpException(400, "Leave end date must be greater than end date");
    const date = new Date()
    // const user: Employee = await this.employeeS.findEmployeeById(LeaveapplicationData.employee_id)
    const MaxLeave = Number(user.leaveCount);
    console.log(user)
    LeaveapplicationData.leave_approver = user.reports_to;
    LeaveapplicationData.employee_id = user._id
    const prevLeaves: ILeaveApplication[] = await this.application.find(
      { employee_id: LeaveapplicationData.employee_id,'createdAt': {
        '$gte': new Date(date.getFullYear().toString()),
      }, });
    const totalApplied = this.getBusinessDatesCount(new Date(LeaveapplicationData.from_date), new Date(LeaveapplicationData.to_date))
    if(MaxLeave < totalApplied){
      throw  new HttpException(400, "total leave days exceed available leaves")
    }
    const leaveDiff = MaxLeave - totalApplied;
    const monthAfterOnboarding = this.monthDiff(new Date(user.date_of_joining), new Date());
    // if(user)
    if(totalApplied > 12){
      throw new HttpException(400, "You can apply for more than 12 working days");
    }
    if(monthAfterOnboarding == 0){
      throw new HttpException(400, "You can only apply exactly one month after onboarding");
    }
    console.log(prevLeaves, 'prev')
    if(prevLeaves.length == 0){
      // console.log(prevLeaves)
      const createLeaveapplicationData: ILeaveApplication = await this.application.create(LeaveapplicationData);
      await EmployeeModel.findOneAndUpdate({_id: user._id}, {
        $set: {leaveCount: leaveDiff }
      })
      return createLeaveapplicationData;
    }else{
      const getLeaveDays = prevLeaves.map(e => this.getBusinessDatesCount(new Date(e.from_date), new Date(e.to_date)))
      const totalLeaveThisYear = getLeaveDays.reduce((previousValue, currentValue) => previousValue + currentValue)
      const oldAndNewLeave = totalApplied + totalLeaveThisYear;
      console.log(getLeaveDays)
      console.log(totalLeaveThisYear, 'totalLeaveThisYear')
      if(totalLeaveThisYear > MaxLeave){
        throw new HttpException(400, "You have exceeded your total alloted leave");
      }else{
        if(oldAndNewLeave > MaxLeave){
          throw new HttpException(400, "You have used "+ (totalLeaveThisYear) +", you have "+ (MaxLeave -  totalLeaveThisYear )+ " leave left");
        }else{
          const createLeaveapplicationData: ILeaveApplication = await this.application.create(LeaveapplicationData);
          await EmployeeModel.findOneAndUpdate({_id: user._id}, {
            $set: {leaveCount: leaveDiff }
          })
          return createLeaveapplicationData;
        }
      }
    }
  }

  public async updateLeaveapplication(LeaveapplicationId: string, LeaveapplicationData: UpdateLeaveApplicationDTO): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, "Bad request");

    if (LeaveapplicationData._id ) {
      const findLeaveapplication: ILeaveApplication = await this.application.findOne({ _id : LeaveapplicationData._id  });
      if (findLeaveapplication && findLeaveapplication._id != LeaveapplicationId) throw new HttpException(409, `${LeaveapplicationData._id } already exists`);
    }
    const updateLeaveapplicationById: ILeaveApplication = await this.application.findByIdAndUpdate(LeaveapplicationId, LeaveapplicationData,{new: true});
    if (!updateLeaveapplicationById) throw new HttpException(409, "leave does not exist");

    return updateLeaveapplicationById;
  }
  public async updateLeaveCount(){
    try{
      // const salaryDetailsData = req.body;
      const newArray = []
      for (let index = 0; index < leaveCount.length; index++) {
          const findEmployee: Employee = await EmployeeModel
          .findOneAndUpdate({ ogid: leaveCount[index].ogid },
             {$set: {'leaveCount': leaveCount[index].leaveCount}});
          if(findEmployee){
              newArray.push(findEmployee)

          }
      }
      console.log(newArray)
      // const results = await EmployeeModel.updateMany({type: '_id'}, newArray)
      // await EmployeeModel.updateMany({_id: {$in: [...newArray['employee_id']]}},{$set: {leaveCount: {$in: [...]}}})
   
      // console.log(results)
      // res.status(201).json({ data: results, message: 'ContactDetails succesfully created' });
  }
  catch(error){
   console.log(error);
  }
  }
  

  public async deleteLeaveapplication(LeaveapplicationId: string): Promise<ILeaveApplication> {
    const deleteLeaveapplicationById: ILeaveApplication = await this.application.findByIdAndDelete(LeaveapplicationId);
    if (!deleteLeaveapplicationById) throw new HttpException(409, "shift does not exist");

    return deleteLeaveapplicationById;
  }


  public getBusinessDatesCount(startDate, endDate) {
    console.log('start date')
    console.log(startDate, endDate)
      let count = 0;
      const curDate = new Date(startDate.getTime());
      while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if(!(dayOfWeek in [0, 6])) count++;
          curDate.setDate(curDate.getDate() + 1);
      }
      return count;
  }
  public monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
   }

  public async addLeavesForEmployees(): Promise<void>{
    await this.application.updateMany({status: "active"}, {
      $inc: {leaveCount: 24}
    })
  }


}


export default LeaveApplicationService;
