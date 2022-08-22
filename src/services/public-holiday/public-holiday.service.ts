import { CreatePublicHolidayDto } from '@/dtos/public-holiday/public_holiday.dto';
import { IPublicHoliday } from '@/interfaces/public-holiday/public_holiday.interface';
import publicHolidayModel from '@/models/public-holiday/public_holiday.model';
import { HttpException } from '@/exceptions/HttpException';
import omit from 'lodash/omit';
// import { isEmpty } from '@/utils/util';

class PublicHolidayService {
  public publicHolidayModel = publicHolidayModel;

  public async create(req, publicHolidayData: CreatePublicHolidayDto): Promise<IPublicHoliday> {
    const newData = publicHolidayData;

    const publicHolidayExists = await publicHolidayModel.exists(newData);
    if (publicHolidayExists) {
      throw new HttpException(409, `${newData.title} Public holiday already exists`);
    }

    newData.created_by = req.user._id;
    newData.project_id = req.user.projectId._id;

    let publicHoliday = await publicHolidayModel.create(newData);
    console.log(`${newData.title} Public holiday has been created`, publicHoliday);
    publicHoliday = omit(publicHoliday.toObject(), ['updated_by', 'deleted_by']);

    return publicHoliday;
  }

  public async findAll(): Promise<IPublicHoliday[]> {
    const publicHolidays: IPublicHoliday[] = await this.publicHolidayModel.find();
    return publicHolidays;
  }
}

export default PublicHolidayService;
