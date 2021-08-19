/* eslint-disable prettier/prettier */
import { CreateShiftTypeDto } from '@dtos/shift/shift_type.dto';
import { HttpException } from '@exceptions/HttpException';
import { ShiftType } from '@interfaces/shift-interface/shift_type.interface';
import shiftTypeModel from '@models/shift/shift_type.model';
import { isEmpty } from '@utils/util';

class shiftTypeService {
  public shiftTypes = shiftTypeModel;

  public async findAllshiftType(): Promise<ShiftType[]> {
    const shiftTypes: ShiftType[] = await this.shiftTypes.find();
    return shiftTypes;
  }

  public async findshiftTypeById(shiftTypeId: string): Promise<ShiftType> {
    if (isEmpty(shiftTypeId)) throw new HttpException(400, "You're not shiftTypeId");

    const findshiftType: ShiftType = await this.shiftTypes.findOne({ _id: shiftTypeId });
    if (!findshiftType) throw new HttpException(409, "You're not shiftType");

    return findshiftType;
  }

  public async createshiftType(shiftTypeData: CreateShiftTypeDto): Promise<ShiftType> {
    if (isEmpty(shiftTypeData)) throw new HttpException(400, "Bad request");

    const findshiftType: ShiftType = await this.shiftTypes.findOne({ shift_name: shiftTypeData.shift_name });
    if (findshiftType) throw new HttpException(409, `${shiftTypeData.shift_name} already exists`);

    ;
    const createshiftTypeData: ShiftType = await this.shiftTypes.create(shiftTypeData);

    return createshiftTypeData;
  }

  public async updateshiftType(shiftTypeId: string, shiftTypeData: CreateShiftTypeDto): Promise<ShiftType> {
    if (isEmpty(shiftTypeData)) throw new HttpException(400, "Bad request");

    if (shiftTypeData.shift_name) {
      const findshiftType: ShiftType = await this.shiftTypes.findOne({ shift_name: shiftTypeData.shift_name });
      if (findshiftType && findshiftType._id != shiftTypeId) throw new HttpException(409, `${shiftTypeData.shift_name} already exists`);
    }
    const updateshiftTypeById: ShiftType = await this.shiftTypes.findByIdAndUpdate(shiftTypeId, { shiftTypeData });
    if (!updateshiftTypeById) throw new HttpException(409, "shift does not exist");

    return updateshiftTypeById;
  }

  public async deleteshiftType(shiftTypeId: string): Promise<ShiftType> {
    const deleteshiftTypeById: ShiftType = await this.shiftTypes.findByIdAndDelete(shiftTypeId);
    if (!deleteshiftTypeById) throw new HttpException(409, "shift does not exist");

    return deleteshiftTypeById;
  }
}

export default shiftTypeService;
