/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';

import { HttpException } from '@/exceptions/HttpException';
import { ILeaveSettings } from '@/interfaces/leave-interface/leave-settings.interface';
import LeavesettingModel from '@/models/leave/leave-setting-model';
import { CreateLeaveSettingsDTO, UpdateLeaveSettingsDTO } from '@/dtos/Leave/leave-settings.dto';

class LeaveSettingsService {
  public setting = LeavesettingModel;

  public async findAllLeavesetting(): Promise<ILeaveSettings[]> {
    const setting: ILeaveSettings[] = await this.setting.find();
    return setting;
  }

  public async findLeavesettingById(LeavesettingId: string): Promise<ILeaveSettings> {
    if (isEmpty(LeavesettingId)) throw new HttpException(400, "You're not LeavesettingId");

    const findLeavesetting: ILeaveSettings = await this.setting.findOne({ _id: LeavesettingId });
    if (!findLeavesetting) throw new HttpException(409, "Leave setting not found");

    return findLeavesetting;
  }

  public async createLeavesetting(LeavesettingData: CreateLeaveSettingsDTO): Promise<ILeaveSettings> {
    if (isEmpty(LeavesettingData)) throw new HttpException(400, "No data provided");

       const findBranch: ILeaveSettings = await this.setting.findOne({_id: LeavesettingData._id});
       if(findBranch) throw new HttpException(409, `Branch ${LeavesettingData._id} already exists`);

       const createLeavesettingData: ILeaveSettings = await this.setting.create(LeavesettingData);
       return createLeavesettingData;
  }

  public async updateLeavesetting(LeavesettingId: string, LeavesettingData: UpdateLeaveSettingsDTO): Promise<ILeaveSettings> {
    if (isEmpty(LeavesettingData)) throw new HttpException(400, "Bad request");

    if (LeavesettingData._id ) {
      const findLeavesetting: ILeaveSettings = await this.setting.findOne({ _id : LeavesettingData._id  });
      if (findLeavesetting && findLeavesetting._id != LeavesettingId) throw new HttpException(409, `${LeavesettingData._id } already exists`);
    }
    const updateLeavesettingById: ILeaveSettings = await this.setting.findByIdAndUpdate(LeavesettingId,  LeavesettingData );
    if (!updateLeavesettingById) throw new HttpException(409, "setting does not exist");

    return updateLeavesettingById;
  }

  public async deleteLeavesetting(LeavesettingId: string): Promise<ILeaveSettings> {
    const deleteLeavesettingById: ILeaveSettings = await this.setting.findByIdAndDelete(LeavesettingId);
    if (!deleteLeavesettingById) throw new HttpException(409, "setting does not exist");

    return deleteLeavesettingById;
  }
}

export default LeaveSettingsService;