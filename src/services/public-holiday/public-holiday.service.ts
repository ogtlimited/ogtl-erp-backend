import { CreatePublicHolidayDto } from '@/dtos/public-holiday/public_holiday.dto';
import { IPublicHoliday } from '@/interfaces/public-holiday/public_holiday.interface';
import publicHolidayModel from '@/models/public-holiday/public_holiday.model';
import { HttpException } from '@/exceptions/HttpException';
import omit from 'lodash/omit';
// import { isEmpty } from '@/utils/util';
import moment from 'moment';

class PublicHolidayService {
  public publicHolidayModel = publicHolidayModel;

  public async create(user, publicHolidayData: CreatePublicHolidayDto): Promise<IPublicHoliday> {
    const newData = publicHolidayData;

    const publicHolidayExists = await publicHolidayModel.exists(newData);
    if (publicHolidayExists) {
      throw new HttpException(409, `${newData.title} Public holiday already exists`);
    }

    let publicHoliday = await publicHolidayModel.create(newData);
    console.log(`${newData.title} Public holiday has been created`, publicHoliday);
    publicHoliday = omit(publicHoliday.toObject(), ['updated_by', 'deleted_by']);

    console.log('This user created this public holiday', user._id);

    return publicHoliday;
  }
}

export default PublicHolidayService;
