/* eslint-disable prettier/prettier */

import { ILeaveApprovalLevel } from '@/interfaces/leave-interface/leave_approval_level.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import leavApprovalLevelModel from '@/models/leave/leave_approval_level.model'
import departmentModel from '@/models/department/department.model'

class LeaveApprovalLevelService {
  private leavApprovalLevelModel = leavApprovalLevelModel;
  private departmentModel = departmentModel;

  public async createLeaveApprovalLevel(query: any): Promise<ILeaveApprovalLevel> {
      const departmentLeaveApprovalLevel = this.findDesignationsDepartmentLeaveApprovalLevel(query.designation_id)
      if (isEmpty(query)) throw new HttpException(400, 'Bad request');
      if(query.leave_approval_level > departmentLeaveApprovalLevel) {
         throw new HttpException(401, 'Approval level cannot be greater than that of department');
      }
      const leaveApprovalLevel: ILeaveApprovalLevel[] = await this.leavApprovalLevelModel.find({designation_id: query.designation_id})
      console.log("leaveApprovalLevel", leaveApprovalLevel)
      if(leaveApprovalLevel.length >= 1 ) throw new HttpException(400, 'Record already exist');
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
      const leaveApprovalLevel: ILeaveApprovalLevel = await this.leavApprovalLevelModel
      .findOne({ _id: leaveApprovalLevelId });
      if (!leaveApprovalLevel) throw new HttpException(409, 'Leave approval level not found');
      return leaveApprovalLevel;
  }

  private async findDesignationsDepartmentId(designation_id: string): Promise<any> {
      const recordsWithPopulatedDesignation: any = await this.leavApprovalLevelModel
      .find({designation_id})
      .populate('designation_id');
      return recordsWithPopulatedDesignation.designation_id.department_id;
}
  private async findDesignationsDepartmentLeaveApprovalLevel(designation_id: string): Promise<any> {
      const department_id = await this.findDesignationsDepartmentId(designation_id)
      const departmentRecords: any = await this.departmentModel.find({department_id});
      return departmentRecords.leave_approval_level;
}
}
export default LeaveApprovalLevelService;
