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
const moment = require('moment')

class LeaveApplicationService {
  public application = applicationModel;
  public allocationM = allocationModel;
  private leaveApprovalLevelModel = leaveApprovalLevelModel;
  private departmentModel = departmentModel;
  public employeeS = new EmployeeService();
  public employeeModel = EmployeeModel;
  private startOfYear = new Date(moment().startOf('year').toString()); 
  private endOfYear = new Date(moment().endOf('year').toString());
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
    LeaveapplicationData.approval_level = await this.getApplicantsImmediateLeadLeaveApprovalLevel(LeaveapplicationData)
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, 'Bad request');
    const startDate = new Date(LeaveapplicationData.from_date);
    const endDate = new Date(LeaveapplicationData.to_date);
    const leave_period = await this.application.findOne(
      {employee_id: LeaveapplicationData.employee_id, createdAt:{$gte:startDate,$lt:endDate},status:{$ne: "rejected"}})
    if(leave_period) throw new HttpException(400, 'Your leave is being processed')
    if (startDate > endDate) throw new HttpException(400, 'Leave end date must be greater than start date');
    const date = new Date();
    const MaxLeave = Number(user.leaveCount);
    const totalApplied = this.getBusinessDatesCount(new Date(LeaveapplicationData.from_date), new Date(LeaveapplicationData.to_date));
    if (MaxLeave < totalApplied) {
      throw new HttpException(400, 'total leave days exceed available leaves');
    };
    const monthAfterOnboarding = this.monthDiff(new Date(user.date_of_joining), new Date());
    // if(user)
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
  public async getLeaveapplicationByEmployeeId(employee_id: string): Promise<ILeaveApplication[]> {
    if (isEmpty(employee_id)) throw new HttpException(400, "You're not LeaveapplicationId");
    const findLeaveapplication: ILeaveApplication[] = await this.application.find({ employee_id: employee_id });
    if (!findLeaveapplication) throw new HttpException(409, 'Leave application not found');
    return findLeaveapplication;
  }
  public async getLeaveApplicationsForLeads(user, query: any): Promise<ILeaveApplication[]> {
   let matchBy = { leave_approver: user._id, hr_stage:{$ne: true}}
   const leaveApplications= await this.getLeaveApplicationsHelperMethod(matchBy,query)
  return leaveApplications;
  }
  public async approveLeadsLeaveApplications(leaveId: String, user): Promise<ILeaveApplication> {
    const departmentHighestLeaveApprovalLevel = await this.getDepartmentHighestLeaveApprovalLevel(user)
    const leadsApprovalLevel = await this.getUsersLeaveApprovalLevel(user)
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
    return leaveApplication;
  }
  public async rejectLeadsLeaveApplications(leaveId: String, user, query): Promise<ILeaveApplication> {
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
    return leaveApplication;
  }
  public async getLeaveApplicationsForHr(query:any ): Promise<ILeaveApplication[]> {
    let matchBy = { hr_stage: true, status: "pending"}
    const leaveApplications= await this.getLeaveApplicationsHelperMethod(matchBy, query)
    return leaveApplications;
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
    await this.employeeModel.findOneAndUpdate({_id: leaveApplication.employee_id},
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
  public async checkWhetherUserIsALead(user): Promise<any>{
    const usersRecords: any = await this.leaveApprovalLevelModel.findOne({designation_id: user.designation})
    const usersApprovalLevel = await usersRecords?.approval_level
    if(usersApprovalLevel>0) return true
    return false 
  }
  private async getDepartmentHighestLeaveApprovalLevel(user): Promise<any>{
    const departmentRecord: any = await this.departmentModel.findOne({_id: user.department})
    return await departmentRecord.leave_approval_level
  }
  private async getUsersLeaveApprovalLevel(user): Promise<any>{
    const usersLeaveApprovalLevel: any = await this.leaveApprovalLevelModel.findOne({designation_id: user?.designation})
    return await usersLeaveApprovalLevel.approval_level
  }
  private async getImmediateSupervisorsLeaveApprovalLevel(user): Promise<any>{
    const supervisorsRecord: any = await this.employeeModel.findOne({_id: user.reports_to})
    const supervisorsLeaveApprovalRecords: any = await this.leaveApprovalLevelModel.findOne({designation_id: supervisorsRecord.designation})
    return await supervisorsLeaveApprovalRecords.approval_level
  }
  private async getApplicantsImmediateLeadLeaveApprovalLevel(payload): Promise<any>{
    const leadsLeaveApprovalRecords: any = await this.employeeModel.findOne({_id: payload.leave_approver})
    const leadsLeaveApprovalLevel: any = await this.leaveApprovalLevelModel.findOne({designation_id: leadsLeaveApprovalRecords.designation})
    return await leadsLeaveApprovalLevel.approval_level
  }
  public async countHrPendingLeaves(): Promise<any>{
    const pendingLeaves: any = await this.application.find({hr_stage: true, status: "pending"}).countDocuments()
    return await pendingLeaves
  }
  public async countHrApprovedLeaves(): Promise<any>{
    const approvedLeaves: any = await this.application.find({hr_stage: true, status: "approved"}).countDocuments()
    return await approvedLeaves
  }
  public async countHrRejectedLeaves(): Promise<any>{
    const hrRejectedLeaves: any = await this.application.find({hr_stage: true, status:"rejected"}).countDocuments()
    return await hrRejectedLeaves
  }
  public async countUsedLeavesByEmployee(user): Promise<any>{
    const matchBy = {
      employee_id: user._id,
      hr_stage: true, status:"approved",
      createdAt:{$gte:this.startOfYear,$lt:this.endOfYear}
      }
    const employeeUsedLeaves: any = await this.getEmployeeApprovedLeaveDays(matchBy)
    let count = 0
    for(let i=0; i<employeeUsedLeaves.length; i++){
      count += employeeUsedLeaves[i].leaveApplication
    }
    return count
  }
  public async countMedicalLeavesByEmployee(user): Promise<any>{
    const matchBy = {
      employee_id: user._id,
      hr_stage: true, status:"approved",
      leave_type: "Sick",
      createdAt:{$gte:this.startOfYear,$lt:this.endOfYear}
      }
    const employeeUsedLeaves: any = await this.getEmployeeApprovedLeaveDays(matchBy)
    let count = 0
    for(let i=0; i<employeeUsedLeaves.length; i++){
      count += employeeUsedLeaves[i].leaveApplication
    }
    return count
  }
  public async countOtherLeaves(user): Promise<any>{
    const matchBy = {
      employee_id: user._id,
      hr_stage: true, status:"approved",
      leave_type:{$ne: "Sick"},
      createdAt:{$gte:this.startOfYear,$lt:this.endOfYear}
      }
    const employeeUsedLeaves: any = await this.getEmployeeApprovedLeaveDays(matchBy)
    let count = 0
    for(let i=0; i<employeeUsedLeaves.length; i++){
      count += employeeUsedLeaves[i].leaveApplication
    }
    return count
  }
  public async countRemainingLeaves(user): Promise<any>{
    const employeeRemainingLeaves: any = await this.employeeModel.findOne({_id: user._id})
    return employeeRemainingLeaves.leaveCount
  }
  private async getEmployeeApprovedLeaveDays(matchBy): Promise<any>{
     const employeeUsedLeaves: any = await this.application.find(matchBy)
     const employeeUsedLeaveDaysCount = await (Promise.all(employeeUsedLeaves))
     const formatedLeaveApplication = employeeUsedLeaveDaysCount.map(leaveApplication=>{
      return {leaveApplication: this.getBusinessDatesCount(leaveApplication.from_date, leaveApplication.to_date)}
     })
    return formatedLeaveApplication
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
    const countDocuments:any = await this.application.aggregate(removeLimitAndSkip)
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
