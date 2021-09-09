/* eslint-disable prettier/prettier */
import { CreateShiftTypeDto, UpdateShiftTypeDto } from '@dtos/shift/shift_type.dto';
import { HttpException } from '@exceptions/HttpException';
import { IShiftType } from '@interfaces/shift-interface/shift_type.interface';
import shiftTypeModel from '@models/shift/shift_type.model';
import { isEmpty } from '@utils/util';
import { SumHours } from '@utils/calculateTimeDifference';

class shiftTypeService {
  public shiftTypes = shiftTypeModel;

  public async findAllshiftType(): Promise<IShiftType[]> {
    return this.shiftTypes.find();
  }

  public async findshiftTypeById(shiftTypeId: string): Promise<IShiftType> {
    if (isEmpty(shiftTypeId)) throw new HttpException(400, "No shift type Id provided");

    const findShiftType: IShiftType = await this.shiftTypes.findOne({ _id: shiftTypeId });
    if (!findShiftType) throw new HttpException(409, "You're not shiftType");

    return findShiftType;
  }

  public async createshiftType(shiftTypeData: CreateShiftTypeDto): Promise<IShiftType> {
    if (isEmpty(shiftTypeData)) throw new HttpException(400, "Bad request");

    const findShiftType: IShiftType = await this.shiftTypes.findOne({ shift_name: shiftTypeData.shift_name });
    if (findShiftType) throw new HttpException(409, `${shiftTypeData.shift_name} already exists`);
    const result = SumHours(shiftTypeData.end_time,shiftTypeData.start_time)
    if(result < 8) throw new HttpException(409,"Working hours has to be greater than 8");
    return await this.shiftTypes.create(shiftTypeData);
  }

  public async updateshiftType(shiftTypeId: string, shiftTypeData: UpdateShiftTypeDto): Promise<IShiftType> {
    if (isEmpty(shiftTypeData)) throw new HttpException(400, "Bad request");

    if (shiftTypeData._id) {
      const findShiftType: IShiftType = await this.shiftTypes.findOne({ _id: shiftTypeData._id });
      if (findShiftType && findShiftType._id != shiftTypeId) throw new HttpException(409, `${shiftTypeData.shift_name} already exists`);
    }
    const updateShiftTypeById: IShiftType = await this.shiftTypes.findByIdAndUpdate(shiftTypeId,  shiftTypeData ,{new:true});
    if (!updateShiftTypeById) throw new HttpException(409, "shift does not exist");

    return updateShiftTypeById;
  }

  public async deleteshiftType(shiftTypeId: string): Promise<IShiftType> {
    const deleteShiftTypeById: IShiftType = await this.shiftTypes.findByIdAndDelete(shiftTypeId);
    if (!deleteShiftTypeById) throw new HttpException(409, "shift does not exist");

    return deleteShiftTypeById;
  }
}

export default shiftTypeService;
