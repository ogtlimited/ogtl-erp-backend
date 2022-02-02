/* eslint-disable prettier/prettier */

import allocationModel from '@/models/leave/allocation.model';
import { ILeaveAllocation } from '@/interfaces/leave-interface/allocation.interface';
import { HttpException } from '@exceptions/HttpException';

import { isEmpty } from '@utils/util';
import { CreateLeaveAllocationDto, UpdateLeaveAllocationDto } from '@/dtos/Leave/allocation.dto';


class LeaveAllocationService {
  public allocation = allocationModel;

  public async findAllLeaveAllocation(): Promise<ILeaveAllocation[]> {
    const allocation: ILeaveAllocation[] = await this.allocation.find();
    return allocation;
  }

  public async findLeaveAllocationById(LeaveAllocationId: string): Promise<ILeaveAllocation> {
    if (isEmpty(LeaveAllocationId)) throw new HttpException(400, "You're not LeaveAllocationId");

    const findLeaveAllocation: ILeaveAllocation = await this.allocation.findOne({ _id: LeaveAllocationId });
    if (!findLeaveAllocation) throw new HttpException(409, "Leave Allocation not found");

    return findLeaveAllocation;
  }

  public async createLeaveAllocation(LeaveAllocationData: CreateLeaveAllocationDto): Promise<ILeaveAllocation> {
    if (isEmpty(LeaveAllocationData)) throw new HttpException(400, "Bad request");

    // const findLeaveAllocation: ILeaveAllocation = await this.allocation.findOne({ employee_id: LeaveAllocationData.employee_id });
    // if (findLeaveAllocation) throw new HttpException(409, `${LeaveAllocationData.employee_id} already exists`);
    const createLeaveAllocationData: ILeaveAllocation = await this.allocation.create(LeaveAllocationData);

    return createLeaveAllocationData;
  }

  public async updateLeaveAllocation(LeaveAllocationId: string, LeaveAllocationData: UpdateLeaveAllocationDto): Promise<ILeaveAllocation> {
    if (isEmpty(LeaveAllocationData)) throw new HttpException(400, "Bad request");

    if (LeaveAllocationData._id ) {
      const findLeaveAllocation: ILeaveAllocation = await this.allocation.findOne({ _id : LeaveAllocationData._id  });
      if (findLeaveAllocation && findLeaveAllocation._id != LeaveAllocationId) throw new HttpException(409, `${LeaveAllocationData._id } already exists`);
    }
    const updateLeaveAllocationById: ILeaveAllocation = await this.allocation.findByIdAndUpdate(LeaveAllocationId, { LeaveAllocationData });
    if (!updateLeaveAllocationById) throw new HttpException(409, "shift does not exist");

    return updateLeaveAllocationById;
  }

  public async deleteLeaveAllocation(LeaveAllocationId: string): Promise<ILeaveAllocation> {
    const deleteLeaveAllocationById: ILeaveAllocation = await this.allocation.findByIdAndDelete(LeaveAllocationId);
    if (!deleteLeaveAllocationById) throw new HttpException(409, "shift does not exist");

    return deleteLeaveAllocationById;
  }
}

export default LeaveAllocationService;
