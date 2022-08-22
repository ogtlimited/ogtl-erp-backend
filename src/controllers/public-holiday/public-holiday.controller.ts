import { Request, Response, NextFunction } from 'express';
import { CreatePublicHolidayDto } from '@/dtos/public-holiday/public_holiday.dto';
import { IPublicHoliday } from '@/interfaces/public-holiday/public_holiday.interface';
import PublicHolidayService from '@/services/public-holiday/public-holiday.service';

class PublicHolidayController {
  public publicHolidayService = new PublicHolidayService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publicHolidayData: CreatePublicHolidayDto = req.body;
      const createdPublicHoliday: IPublicHoliday = await this.publicHolidayService.create(req, publicHolidayData);
      res.status(201).json({ data: createdPublicHoliday, message: `${createdPublicHoliday.title} public holiday created successfully` });
    } catch (error) {
      next(error);
    }
  };

  public findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const publicHolidayEntries = await this.publicHolidayService.findAll();
      res.status(200).json({ data: publicHolidayEntries });

      console.table(
        publicHolidayEntries.map(entry => ({
          title: entry.title,
          deleted: entry.deleted,
        })),
      );
      console.log(`========  ${publicHolidayEntries.length} public holidays found  =======`);
      console.log(`==========================================`);
    } catch (error) {
      next(error);
    }
  };
}
export default PublicHolidayController;
