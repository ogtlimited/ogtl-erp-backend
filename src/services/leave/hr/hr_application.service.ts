/* eslint-disable prettier/prettier */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';
import applicationModel from '@/models/leave/application.model';
import allocationModel from '@/models/leave/allocation.model';
import EmployeeService from '@services/employee.service';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import projectModel from '@/models/project/project.model';
import EmailService from '@/utils/email.service';
import { leaveApplicationStatusMessage } from '@/utils/message';

class HrLeaveApplicationService {
  public application = applicationModel;
  public allocationM = allocationModel;
  public employeeS = new EmployeeService();
  public employeeModel = EmployeeModel;
  public project = projectModel;
  private today = new Date();

    public async getLeaveApplicationsForHr(query:any ): Promise<ILeaveApplication[]> {
    let matchBy = { hr_stage: true, status: "pending"}
    const leaveApplications= await this.getLeaveApplicationsHelperMethod(matchBy, query)
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
    await this.sendLeaveStatusNotificationMail(leaveApplication, "approved")
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
    await this.sendLeaveStatusNotificationMail(leaveApplication, "rejected")
    return leaveApplication;
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
  private async sendLeaveStatusNotificationMail(applicant, status){
    const leaveApplicant = await this.employeeModel.findOne({_id: applicant.employee_id})
    const formattedFirstName = leaveApplicant.first_name.charAt(0) + leaveApplicant.first_name.toLowerCase().slice(1)
    const {status_message, status_subject} = leaveApplicationStatusMessage(formattedFirstName, status)
    const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${status_message}`
    EmailService.sendMail(leaveApplicant.company_email, "hr@outsourceglobal.com", status_subject, status_message, body)
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
  public async getLeaveStatusCountForHrDashboard() {
    const leaveCount = await this.application.find({
      hr_stage: true,
     '$group': {
       'status': '$status', 
       'total': {
         '$count': {}
       }
     }
  })
  return leaveCount
  }
}
export default HrLeaveApplicationService;
