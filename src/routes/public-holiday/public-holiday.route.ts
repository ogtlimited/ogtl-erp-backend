import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { CreatePublicHolidayDto } from '@dtos/public-holiday/public_holiday.dto';
import PublicHolidayController from '@controllers/public-holiday/public-holiday.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import permissionMiddleware from '@/middlewares/permission.middleware';

class PublicHolidayRoute implements Routes {
  public path = '/api/public_holidays';
  public router = Router();
  public publicHolidayController = new PublicHolidayController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreatePublicHolidayDto, 'body')], this.publicHolidayController.create);
    this.router.get(`${this.path}/list`, [authMiddleware], this.publicHolidayController.findAll);
    this.router.get(`${this.path}/list/:active`, [authMiddleware], this.publicHolidayController.findAllActive);
    this.router.get(`${this.path}/:id`, [authMiddleware], this.publicHolidayController.findById);
    this.router.patch(
      `${this.path}/:id`,
      [authMiddleware, validationMiddleware(CreatePublicHolidayDto, 'body'), permissionMiddleware('HR')],
      this.publicHolidayController.update,
    );
    this.router.delete(`${this.path}/:id`, [authMiddleware, permissionMiddleware('HR')], this.publicHolidayController.delete);
  }
}

export default PublicHolidayRoute;
