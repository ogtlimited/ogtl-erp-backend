import { Request, Response, NextFunction } from 'express';
import { CreatePublicHolidayDto } from '@/dtos/public-holiday/public_holiday.dto';
import { IPublicHoliday } from '@/interfaces/public-holiday/public_holiday.interface';
import PublicHolidayService from '@/services/public-holiday/public-holiday.service';

class PublicHolidayController {
  public publicHolidayService = new PublicHolidayService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publicHolidayData: CreatePublicHolidayDto = req.body;
      const createPublicHolidayData: IPublicHoliday = await this.publicHolidayService.create(req, publicHolidayData);
      res.status(201).json({ data: createPublicHolidayData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
export default PublicHolidayController;
