/* eslint-disable prettier/prettier */

import { ILeavePolicy } from '@/interfaces/leave-interface/policy.interface';
import { HttpException } from '@exceptions/HttpException';


import { isEmpty } from '@utils/util';
import { CreateLeavePolicyDto, UpdateLeavePolicyDto } from '@/dtos/Leave/policy.dto'
import LeavePolicyModel from '@/models/leave/policy.model';


class LeavePolicyService {
  public leaveType = LeavePolicyModel;

  public async findAllleavePolicy(): Promise<ILeavePolicy[]> {
    const leaveType: ILeavePolicy[] = await this.leaveType.find();
    return leaveType;
  }

  public async findleavePolicyById(leavePolicyId: string): Promise<ILeavePolicy> {
    if (isEmpty(leavePolicyId)) throw new HttpException(400, "You're not leavePolicyId");

    const findleavePolicy: ILeavePolicy = await this.leaveType.findOne({ _id: leavePolicyId });
    if (!findleavePolicy) throw new HttpException(409, "Leave leaveType not found");

    return findleavePolicy;
  }

  public async createleavePolicy(leavePolicyData: CreateLeavePolicyDto): Promise<ILeavePolicy> {
    if (isEmpty(leavePolicyData)) throw new HttpException(400, "Bad request");

    // const findleavePolicy: ILeavePolicy = await this.leaveType.findOne({ employee_id: leavePolicyData.employee_id });
    // if (findleavePolicy) throw new HttpException(409, `${leavePolicyData.employee_id} already exists`);
    const createleavePolicyData: ILeavePolicy = await this.leaveType.create(leavePolicyData);

    return createleavePolicyData;
  }

  public async updateleavePolicy(leavePolicyId: string, leavePolicyData: UpdateLeavePolicyDto): Promise<ILeavePolicy> {
    if (isEmpty(leavePolicyData)) throw new HttpException(400, "Bad request");

    if (leavePolicyData._id ) {
      const findleavePolicy: ILeavePolicy = await this.leaveType.findOne({ _id : leavePolicyData._id  });
      if (findleavePolicy && findleavePolicy._id != leavePolicyId) throw new HttpException(409, `${leavePolicyData._id } already exists`);
    }
    const updateleavePolicyById: ILeavePolicy = await this.leaveType.findByIdAndUpdate(leavePolicyId, { leavePolicyData });
    if (!updateleavePolicyById) throw new HttpException(409, "leave Policy does not exist");

    return updateleavePolicyById;
  }

  public async deleteleavePolicy(leavePolicyId: string): Promise<ILeavePolicy> {
    const deleteleavePolicyById: ILeavePolicy = await this.leaveType.findByIdAndDelete(leavePolicyId);
    if (!deleteleavePolicyById) throw new HttpException(409, "leave Policy  does not exist");

    return deleteleavePolicyById;
  }
}

export default LeavePolicyService;
