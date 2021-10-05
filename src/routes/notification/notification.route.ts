/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { NotificationDto, PutNotificationDto } from '@dtos/notification/notification.dto';
import NotificationController from '@/controllers/notification/notification.controller';


class NotificationRoute implements Routes {
  public path = '/api/notification';
  public router = Router();
  public notification = new NotificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.notification.getNotifications);
    this.router.get(`${this.path}/:notificationId`, authMiddleware, this.notification.getNotification);
    this.router.post(`${this.path}`, [validationMiddleware(NotificationDto, 'body'), authMiddleware], this.notification.createNotification);
    this.router.put(`${this.path}/:notificationId`, authMiddleware, validationMiddleware(PutNotificationDto, 'body'), this.notification.updateNotification);
    this.router.get(`${this.path}/models/all`, authMiddleware, this.notification.getModelNmaes);
    this.router.delete(`${this.path}/:notificationId`, authMiddleware, this.notification.deleteNotification);
  }
}

export default NotificationRoute;