/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { NotificationDto, PutNotificationDto } from '@/dtos/notification/notification.dto';
import { INotification } from '@/interfaces/notification/notification.interface';
import notificationService from '@/services/notification/notification.service';

class NotificationController {
    public notificationService;

    constructor() {
        this.notificationService = new notificationService();
    }

    public getNotifications = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllnotifications: INotification[] = await this.notificationService.findAll();
            res.status(200).json({ data: findAllnotifications, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const notificationId: string = req.params.notificationId;
            const findnotification: INotification = await this.notificationService.find(notificationId);
            res.status(200).json({ data: findnotification, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: NotificationDto = req.body;
            const newnotification: INotification = await this.notificationService.create(Payload);
            res.status(201).json({ data: newnotification, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const notificationId: string = req.params.notificationId;
            const Payload: PutNotificationDto = req.body;
            const updatenotification: INotification = await this.notificationService.update(notificationId, Payload);
            res.status(200).json({ data: updatenotification, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.notificationId;
            const dropnotification: INotification = await this.notificationService.delete(id);
            res.status(200).json({ data: dropnotification, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default NotificationController;
