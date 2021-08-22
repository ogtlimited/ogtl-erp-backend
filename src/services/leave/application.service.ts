/* eslint-disable prettier/prettier */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import { HttpException } from '@exceptions/HttpException';


import { isEmpty } from '@utils/util';
import { CreateLeaveApplicationDTO, UpdateLeaveApplicationDTO } from '@/dtos/Leave/application.dto';
import applicationModel from '@/models/leave/application.model';

class LeaveApplicationService {
  public application = applicationModel;

  public async findAllLeaveapplication(): Promise<ILeaveApplication[]> {
    const application: ILeaveApplication[] = await this.application.find();
    return application;
  }

  public async findLeaveapplicationById(LeaveapplicationId: string): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationId)) throw new HttpException(400, "You're not LeaveapplicationId");

    const findLeaveapplication: ILeaveApplication = await this.application.findOne({ _id: LeaveapplicationId });
    if (!findLeaveapplication) throw new HttpException(409, "Leave application not found");

    return findLeaveapplication;
  }

  public async createLeaveapplication(LeaveapplicationData: CreateLeaveApplicationDTO): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, "Bad request");

    // const findLeaveapplication: ILeaveApplication = await this.application.findOne({ employee_id: LeaveapplicationData.employee_id });
    // if (findLeaveapplication) throw new HttpException(409, `${LeaveapplicationData.employee_id} already exists`);
    const createLeaveapplicationData: ILeaveApplication = await this.application.create(LeaveapplicationData);

    return createLeaveapplicationData;
  }

  public async updateLeaveapplication(LeaveapplicationId: string, LeaveapplicationData: UpdateLeaveApplicationDTO): Promise<ILeaveApplication> {
    if (isEmpty(LeaveapplicationData)) throw new HttpException(400, "Bad request");

    if (LeaveapplicationData._id ) {
      const findLeaveapplication: ILeaveApplication = await this.application.findOne({ _id : LeaveapplicationData._id  });
      if (findLeaveapplication && findLeaveapplication._id != LeaveapplicationId) throw new HttpException(409, `${LeaveapplicationData._id } already exists`);
    }
    const updateLeaveapplicationById: ILeaveApplication = await this.application.findByIdAndUpdate(LeaveapplicationId, { LeaveapplicationData });
    if (!updateLeaveapplicationById) throw new HttpException(409, "shift does not exist");

    return updateLeaveapplicationById;
  }

  public async deleteLeaveapplication(LeaveapplicationId: string): Promise<ILeaveApplication> {
    const deleteLeaveapplicationById: ILeaveApplication = await this.application.findByIdAndDelete(LeaveapplicationId);
    if (!deleteLeaveapplicationById) throw new HttpException(409, "shift does not exist");

    return deleteLeaveapplicationById;
  }
}

export default LeaveApplicationService;
