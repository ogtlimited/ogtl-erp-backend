/* eslint-disable prettier/prettier */

import { ILeavePeriod } from '@/interfaces/leave-interface/period.interface';
import { HttpException } from '@exceptions/HttpException';


import { isEmpty } from '@utils/util';
import { CreateLeavePeriodDto, UpdateLeavePeriodDto } from '@/dtos/Leave/period.dto'
import LeavePeriodModel from '@/models/leave/period.model';


class LeavePeriodService {
  public leaveType = LeavePeriodModel;

  public async findAllleavePeriod(): Promise<ILeavePeriod[]> {
    const leaveType: ILeavePeriod[] = await this.leaveType.find();
    return leaveType;
  }

  public async findleavePeriodById(leavePeriodId: string): Promise<ILeavePeriod> {
    if (isEmpty(leavePeriodId)) throw new HttpException(400, "You're not leavePeriodId");

    const findleavePeriod: ILeavePeriod = await this.leaveType.findOne({ _id: leavePeriodId });
    if (!findleavePeriod) throw new HttpException(409, "Leave leaveType not found");

    return findleavePeriod;
  }

  public async createleavePeriod(leavePeriodData: CreateLeavePeriodDto): Promise<ILeavePeriod> {
    if (isEmpty(leavePeriodData)) throw new HttpException(400, "Bad request");

    // const findleavePeriod: ILeavePeriod = await this.leaveType.findOne({ employee_id: leavePeriodData.employee_id });
    // if (findleavePeriod) throw new HttpException(409, `${leavePeriodData.employee_id} already exists`);
    const createleavePeriodData: ILeavePeriod = await this.leaveType.create(leavePeriodData);

    return createleavePeriodData;
  }

  public async updateleavePeriod(leavePeriodId: string, leavePeriodData: UpdateLeavePeriodDto): Promise<ILeavePeriod> {
    if (isEmpty(leavePeriodData)) throw new HttpException(400, "Bad request");

    if (leavePeriodData._id ) {
      const findleavePeriod: ILeavePeriod = await this.leaveType.findOne({ _id : leavePeriodData._id  });
      if (findleavePeriod && findleavePeriod._id != leavePeriodId) throw new HttpException(409, `${leavePeriodData._id } already exists`);
    }
    const updateleavePeriodById: ILeavePeriod = await this.leaveType.findByIdAndUpdate(leavePeriodId, { leavePeriodData });
    if (!updateleavePeriodById) throw new HttpException(409, "leave period does not exist");

    return updateleavePeriodById;
  }

  public async deleteleavePeriod(leavePeriodId: string): Promise<ILeavePeriod> {
    const deleteleavePeriodById: ILeavePeriod = await this.leaveType.findByIdAndDelete(leavePeriodId);
    if (!deleteleavePeriodById) throw new HttpException(409, "leave period  does not exist");

    return deleteleavePeriodById;
  }
}

export default LeavePeriodService;
