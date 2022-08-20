import { CreatePublicHolidayDto } from '@/dtos/public-holiday/public_holiday.dto';
import { IPublicHoliday } from '@/interfaces/public-holiday/public_holiday.interface';
import publicHolidayModel from '@/models/public-holiday/public_holiday.model';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import omit from 'lodash/omit';
import moment from 'moment';

class PublicHolidayService {
  public publicHolidayModel = publicHolidayModel;

  public async create(req, data: CreatePublicHolidayDto): Promise<IPublicHoliday> {
    const newData = data;

    const publicHolidayExists = await publicHolidayModel.exists(newData);
    if (publicHolidayExists) {
      throw new HttpException(409, 'Public holiday already exists');
    }

    newData.created_by = req.user._id;
    newData.project_id = req.user.projectId;
    newData.startDate = moment(newData.startDate).format('YYYY-MM-DD');
    newData.endDate = moment(newData.endDate).format('YYYY-MM-DD');
    newData.title = req.body.title;
    newData.deleted = false;

    let publicHoliday = await publicHolidayModel.create(newData);
    console.log('Your public holiday has been created', publicHoliday);
    publicHoliday = omit(publicHoliday.toObject(), ['updated_by', 'deleted_by']);

    return publicHoliday;
  }
}

export default PublicHolidayService;
