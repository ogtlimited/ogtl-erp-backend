/* eslint-disable prettier/prettier */

import { ILeaveType } from '@/interfaces/leave-interface/leave-type.interface';
import { HttpException } from '@exceptions/HttpException';


import { isEmpty } from '@utils/util';
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from '@/dtos/Leave/leave-type.dto'
import leaveTypeModel from '@/models/leave/leave-type.model';


class LeaveTypeService {
  public leaveType = leaveTypeModel;

  public async findAllLeaveType(): Promise<ILeaveType[]> {
    const leaveType: ILeaveType[] = await this.leaveType.find();
    return leaveType;
  }

  public async findLeaveTypeById(LeaveTypeId: string): Promise<ILeaveType> {
    if (isEmpty(LeaveTypeId)) throw new HttpException(400, "Bad request");

    const findLeaveType: ILeaveType = await this.leaveType.findOne({ _id: LeaveTypeId });
    if (!findLeaveType) throw new HttpException(409, "Leave Type not found");

    return findLeaveType;
  }

  public async createLeaveType(LeaveleaveTypeData: CreateLeaveTypeDto): Promise<ILeaveType> {
    if (isEmpty(LeaveleaveTypeData)) throw new HttpException(400, "Bad request");

    // const findLeaveleaveType: ILeaveType = await this.leaveType.findOne({ employee_id: LeaveleaveTypeData.employee_id });
    // if (findLeaveleaveType) throw new HttpException(409, `${LeaveleaveTypeData.employee_id} already exists`);
    const createLeaveleaveTypeData: ILeaveType = await this.leaveType.create(LeaveleaveTypeData);

    return createLeaveleaveTypeData;
  }

  public async updateLeaveType(LeaveleaveTypeId: string, LeaveleaveTypeData: UpdateLeaveTypeDto): Promise<ILeaveType> {
    if (isEmpty(LeaveleaveTypeData)) throw new HttpException(400, "Bad request");

    if (LeaveleaveTypeData._id ) {
      const findLeaveleaveType: ILeaveType = await this.leaveType.findOne({ _id : LeaveleaveTypeData._id  });
      if (findLeaveleaveType && findLeaveleaveType._id != LeaveleaveTypeId) throw new HttpException(409, `${LeaveleaveTypeData._id } already exists`);
    }
    const updateLeaveTypeById: ILeaveType = await this.leaveType.findByIdAndUpdate(LeaveleaveTypeId, { LeaveleaveTypeData });
    if (!updateLeaveTypeById) throw new HttpException(409, "leave type does not exist");

    return updateLeaveTypeById;
  }

  public async deleteLeaveType(LeaveleaveTypeId: string): Promise<ILeaveType> {
    const deleteLeaveTypeById: ILeaveType = await this.leaveType.findByIdAndDelete(LeaveleaveTypeId);
    if (!deleteLeaveTypeById) throw new HttpException(409, "leave type does not exist");

    return deleteLeaveTypeById;
  }
}

export default LeaveTypeService;
