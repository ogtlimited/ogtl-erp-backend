/* eslint-disable prettier/prettier */
import { CreateShiftTypeDto, UpdateShiftTypeDto } from '@dtos/shift/shift_type.dto';
import { HttpException } from '@exceptions/HttpException';
import { IShiftType } from '@interfaces/shift-interface/shift_type.interface';
import shiftTypeModel from '@models/shift/shift_type.model';
import { isEmpty } from '@utils/util';
import { SumHours } from '@utils/calculateTimeDifference';
import { slugify } from '@/utils/slugify';
import moment from 'moment'
class shiftTypeService {
  public shiftTypes = shiftTypeModel;
  constructor(){
    // this.totalShiftHours()

  }
  public async findAllshiftType(): Promise<IShiftType[]> {
   
     return this.shiftTypes.find()
  }
  // public async totalShiftHours() {
  //   const allShifts  = await this.findAllshiftType()
  //   const sample  = allShifts[0]
   
  //   const updated = allShifts.map(shift =>{
  //     const startTime = moment(shift.start_time, 'hh:mm a');
  //     const endTime = moment(shift.end_time, 'hh:mm a');
  //     const diff = endTime.diff(startTime, 'hours')
  //     const diffMinutes = endTime.diff(startTime, 'minutes') % 60
  //     if(diff > 0){
  //       return {
  //         ...shift?._doc,
  //         expectedWorkTime: diff + ':' + diffMinutes
  //       }
  //     }else{
  //       const startTime = moment("12:00:00 pm", 'hh:mm a');
  //       const remTill12 = new Date(startTime.diff(moment(shift.start_time, 'hh:mm a'))).getHours() -1
  //       const next = moment().add(1, 'days').format('l')
  //       const splitHM = shift.end_time.split(":")
  //       const tomorrow =  new Date(next);
  //       tomorrow.setHours(parseInt(splitHM[0]),parseInt(splitHM[1]),0)
  //       const endTime = moment(tomorrow, 'hh:mm a')
  //       const diff = endTime.diff(startTime, 'hours') + remTill12
  //       const diffMinutes = endTime.diff(startTime, 'minutes') % 60
  //       console.log('DIFF', endTime.diff(startTime, 'hours'), remTill12, shift.start_time)
  //       return {
  //         ...shift?._doc,
  //         expectedWorkTime: diff + ':' + diffMinutes
  //       }

  //     }
  //   })
  //   updated.forEach(async(e) =>{
  //      await this.shiftTypes.findByIdAndUpdate(e._id,  e ,{new:true})
  //   })
  //   // console.log(updated);
    
  // }

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
    const shift = {
      ...shiftTypeData,
      slug: slugify(shiftTypeData.shift_name)
    }
    return await this.shiftTypes.create(shift);
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
