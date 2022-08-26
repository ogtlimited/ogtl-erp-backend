/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreatePublicHolidayDto } from '@/dtos/public-holiday/public_holiday.dto';
import { IPublicHoliday } from '@/interfaces/public-holiday/public_holiday.interface';
import publicHolidayModel from '@/models/public-holiday/public_holiday.model';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';

class PublicHolidayService {
  public publicHolidayModel = publicHolidayModel;

  public async create(req, publicHolidayData: IPublicHoliday): Promise<IPublicHoliday> {
    const newData = publicHolidayData;
    newData.created_by = req.user._id;
    newData.title = newData.title.toLowerCase();

    const publicHolidayExists = await publicHolidayModel.exists({ title: newData.title });
    if (publicHolidayExists) {
      throw new HttpException(409, `${newData.title} Public holiday already exists`);
    }

    const publicHoliday = await publicHolidayModel.create(newData);

    return publicHoliday;
  }

  public async findAll(): Promise<IPublicHoliday[]> {
    const publicHolidays: IPublicHoliday[] = await this.publicHolidayModel.find();
    return publicHolidays;
  }

  public async findAllActive(): Promise<IPublicHoliday[]> {
    const publicHolidays: IPublicHoliday[] = await this.publicHolidayModel.find({ deleted: false });
    return publicHolidays;
  }

  public async findById(id: string): Promise<IPublicHoliday> {
    if (isEmpty(id)) throw new HttpException(400, 'provide Id');

    const publicHoliday = await this.publicHolidayModel.findOne({ _id: id, deleted: false });

    if (!publicHoliday) {
      throw new HttpException(404, `Public holiday not found`);
    }
    return publicHoliday;
  }

  public async update(req, id: string, updatedData: IPublicHoliday): Promise<IPublicHoliday> {
    if (isEmpty(id)) throw new HttpException(400, 'provide Id');

    const publicHoliday = await this.publicHolidayModel.findOne({ _id: id, deleted: false });

    if (!publicHoliday) {
      throw new HttpException(404, 'Public holiday not found');
    }
    const filter = { _id: id };
    const update = { ...updatedData };
    update.updated_by = req.user._id;
    const updatedPublicHoliday = await publicHolidayModel.findOneAndUpdate(filter, update, { new: true });
    return updatedPublicHoliday;
  }

  public async delete(data: { id: string | number | object; user: string }): Promise<IPublicHoliday> {
    if (isEmpty(data.id)) throw new HttpException(400, 'provide Id');

    const publicHoliday = await this.publicHolidayModel.findOne({ _id: data.id, deleted: false });

    if (!publicHoliday) {
      throw new HttpException(404, 'Public holiday not found');
    }
    const filter = { _id: data.id };
    const update = { deleted: true, deleted_by: data.user };
    const deletedPublicHoliday = await publicHolidayModel.findOneAndUpdate(filter, update, { new: true });
    return deletedPublicHoliday;
  }
}

export default PublicHolidayService;
