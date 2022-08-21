import { Response, NextFunction } from 'express';
import { CreatePublicHolidayDto } from '@/dtos/public-holiday/public_holiday.dto';
import { IPublicHoliday } from '@/interfaces/public-holiday/public_holiday.interface';
import PublicHolidayService from '@/services/public-holiday/public-holiday.service';

class PublicHolidayController {
  public publicHolidayService = new PublicHolidayService();

  public create = async (req, res: Response, next: NextFunction) => {
    try {
      const publicHolidayData: CreatePublicHolidayDto = req.body;
      const createdPublicHoliday: IPublicHoliday = await this.publicHolidayService.create(req, publicHolidayData);
      res.status(201).json({ data: createdPublicHoliday, message: `${createdPublicHoliday.title} public holiday created successfully` });
    } catch (error) {
      next(error);
    }
  };
}
export default PublicHolidayController;
