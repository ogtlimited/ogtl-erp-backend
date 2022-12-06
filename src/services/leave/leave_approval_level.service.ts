/* eslint-disable prettier/prettier */

import { ILeaveApprovalLevel } from '@/interfaces/leave-interface/leave_approval_level.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import leavApprovalLevelModel from '@/models/leave/leave_approval_level.model'
import { LeaveApprovalLevelDto } from '@/dtos/Leave/leave_approval_level.dto';

class LeaveApprovalLevelService {
  private leavApprovalLevelModel = leavApprovalLevelModel;

  public async createLeaveApprovalLevel(query: any): Promise<ILeaveApprovalLevel> {
        if (isEmpty(query)) throw new HttpException(400, 'Bad request');
        const leaveApprovalLevel: ILeaveApprovalLevel[] = await this.leavApprovalLevelModel.find({designation_id: query.designation_id})
        console.log("leaveApprovalLevel", leaveApprovalLevel)
        if(leaveApprovalLevel.length ===1 ) throw new HttpException(400, 'Record already exist');
        return await this.leavApprovalLevelModel.create(query);
  }
  public async findAllLeaveApprovalLevels(): Promise<ILeaveApprovalLevel[]> {
        const leaveApprovalLevel: ILeaveApprovalLevel[] = await this.leavApprovalLevelModel
        .find()
        .populate("designations")
        return leaveApprovalLevel;
  }
  public async findLeaveApprovalLevelById(leaveApprovalLevelId: string): Promise<ILeaveApprovalLevel> {
        if (isEmpty(leaveApprovalLevelId)) throw new HttpException(400, "Bad Request");
        const leaveApprovalLevel: ILeaveApprovalLevel = await this.leavApprovalLevelModel.findOne({ _id: leaveApprovalLevelId });
        if (!leaveApprovalLevel) throw new HttpException(409, 'Leave approval level not found');
        return leaveApprovalLevel;
  }
}
export default LeaveApprovalLevelService;
