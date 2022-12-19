/* eslint-disable prettier/prettier */

import { HttpException } from '@exceptions/HttpException';
import leaveTypeModel from '@/models/leave/leave_type.model';
import { isEmpty } from '@utils/util';

class LeaveTypeService {
  public leaveTypeModel = leaveTypeModel;

  public async getAllLeaveTypes(query:any ): Promise<any> {
    const leaveTypes: any = await this.leaveTypeModel.find(query)
    return leaveTypes;
  }
  public async getLeaveTypeByID(leaveTypeId:string ): Promise<any> {
    if (isEmpty(leaveTypeId)) throw new HttpException(400, "Bad request");
    const leaveType: any = await this.leaveTypeModel.findOne({_id: leaveTypeId})
    if (!leaveType) throw new HttpException(404, 'Leave type not found');
    return leaveType;
  }
  public async createLeaveType(payload: any): Promise<any> {
    if (isEmpty(payload)) throw new HttpException(400, "Bad request");
    const leaveType: any = await this.leaveTypeModel.create(payload);
    return leaveType;
  }
  public async deleteLeaveTypeById(leaveTypeId:string ): Promise<any> {
    if (isEmpty(leaveTypeId)) throw new HttpException(400, "Bad request");
    const leaveType: any = await this.leaveTypeModel.findOneAndUpdate({_id: leaveTypeId},{
      $set:{
        delete: true
      }
    },
    { new: true },
    )
    if (!leaveType) throw new HttpException(404, 'Leave type not found');
    return leaveType;
  }
  
}
export default LeaveTypeService;
