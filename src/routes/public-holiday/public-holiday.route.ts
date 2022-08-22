import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { CreatePublicHolidayDto } from '@dtos/public-holiday/public_holiday.dto';
import PublicHolidayController from '@controllers/public-holiday/public-holiday.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
// import permissionMiddleware from '@/middlewares/permission.middleware';

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
    this.router.get(`${this.path}/list/:id`, [authMiddleware], this.publicHolidayController.findById);
  }
}

export default PublicHolidayRoute;
