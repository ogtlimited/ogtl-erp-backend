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
    } catch (error) {
      next(error);
    }
  };

  public findAllActive = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const publicHolidayEntries = await this.publicHolidayService.findAllActive();
      res.status(200).json({ data: publicHolidayEntries });
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.publicHolidayService.findById(id);
      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const updatedData: CreatePublicHolidayDto = req.body;
      const updatedPublicHoliday: IPublicHoliday = await this.publicHolidayService.update(req, id, updatedData);
      res.status(200).json({ data: updatedPublicHoliday, message: `${updatedData.title} public holiday updated successfully` });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req, res: Response, next: NextFunction) => {
    try {
      const data: any = { id: req.params.id, user: req.user._id };
      const deletedPublicHoliday: IPublicHoliday = await this.publicHolidayService.delete(data);
      res.status(200).json({ data: deletedPublicHoliday, message: `public holiday with id ${data.id} deleted successfully by ${data.user}` });
    } catch (error) {
      next(error);
    }
  };
}
export default PublicHolidayController;
