/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import TaskModel  from '@models/task/task.model';
import { isEmpty } from '@utils/util';
import {sendEmail} from "@utils/email";
// import departmentModel from '@/models/department/department.model';
// import projectModel from '@/models/project/project.model';
import { officeQueryGenerator } from '@/utils/payrollUtil';
import omit from 'lodash/omit'
import {ITask} from "@interfaces/task/task.interface";
import {CreateTaskDto} from "@dtos/task/task.dto";
import EmployeeModel from "@models/employee/employee.model";


class TaskService {
  public taskModel = TaskModel;

  public async findAll(query): Promise<ITask[]> {
    // const officeQuery = officeQueryGenerator(query)
    // officeQuery.deleted = false;
    const tasks: any = await this.taskModel.find(query)
      .populate({path: 'createdBy', select:{first_name: 1, ogid: 1, last_name: 1, _id:0}})
      .populate({path: 'assignedTo', select:{first_name: 1, ogid: 1, last_name: 1, _id:0}})
    return tasks;
  }

  public async findAllEmployeeTask(user, query): Promise<ITask[]> {
    // const officeQuery = officeQueryGenerator(query)
    // officeQuery.deleted = false;
    query.assignedTo = user._id
    const tasks: any = await this.taskModel.find(query)
      .populate({path: 'createdBy', select:{first_name: 1, ogid: 1, last_name: 1, _id:0}})
    return tasks;
  }

  public async findById(id: string): Promise<ITask> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    // const projections = {createdBy:0, __V:0 }
    let task:ITask = await this.taskModel.findOne({_id: id})
      .populate({path: 'createdBy', select:{first_name: 1, ogid: 1, last_name: 1, _id:0}})
      .populate({path: 'assignedTo', select:{first_name: 1, ogid: 1, last_name: 1, _id:0}})
    if (!task) {
      throw new HttpException(404, "no record found")
    }
    // task = task.toObject()
    return task;
  }

  public async create(req, data: CreateTaskDto): Promise<ITask> {
    const newData: ITask = data;

    // if (data.projectId == null && data.departmentId == null) {
    //     throw  new HttpException(400, "please provide a department or project");
    // }
    const employee = await EmployeeModel.findOne({ogid: String(data.assignedTo)}, {_id: 1, company_email:1})
    if (!employee){
      throw new HttpException(404, "employee does not exist")
    }
    newData.assignedTo = employee._id
    newData.createdBy = req.user._id
    const newTask = await this.taskModel.create(newData)
    sendEmail("New Task", newTask.description, employee.company_email, req.user.company_email);
    return newTask;
  }

  public async update( id, updateData: ITask): Promise<ITask> {
    const data: ITask = updateData
    const approvetask  = await this.taskModel.findOneAndUpdate({_id:id}, {
      $set: data
    },{new:true})
    if (!approvetask) {
      throw  new HttpException(400, "please provide valid task Id");
    }
    return approvetask;
  }

}

export default TaskService;
