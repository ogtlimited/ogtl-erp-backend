import { CreatePublicHolidayDto } from '@/dtos/public-holiday/public_holiday.dto';
import { IPublicHoliday } from '@/interfaces/public-holiday/public_holiday.interface';
import publicHolidayModel from '@/models/public-holiday/public_holiday.model';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import omit from 'lodash/omit';
import moment from 'moment';

class PublicHolidayService {
  public publicHolidayModel = publicHolidayModel;

  public async create(user, publicHolidayData: CreatePublicHolidayDto): Promise<IPublicHoliday> {
    const newData = publicHolidayData;

    const publicHolidayExists = await publicHolidayModel.exists(newData);
    if (publicHolidayExists) {
      throw new HttpException(409, `${newData.title} Public holiday already exists`);
    }

    const newPublicHolidayData: CreatePublicHolidayDto = {
      startDate: newData.startDate,
      endDate: newData.endDate,
      title: newData.title,
      project_id: user.projectId,
      updated_by: null,
      created_by: user._id,
      deleted_by: null,
      deleted: false,
    };

    let publicHoliday = await publicHolidayModel.create(newPublicHolidayData);
    console.log(`${newData.title} Public holiday has been created`, publicHoliday);
    publicHoliday = omit(publicHoliday.toObject(), ['updated_by', 'deleted_by']);

    return publicHoliday;
  }
}

export default PublicHolidayService;
