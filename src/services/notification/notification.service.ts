/* eslint-disable prettier/prettier */

import notificationModel from '@/models/notification/notification.model';
import { INotification } from '@/interfaces/notification/notification.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { NotificationDto, PutNotificationDto } from '@/dtos/notification/notification.dto';

class NotificationService {
    public notification: any;

    constructor() {
        this.notification = notificationModel;
    }

    public async findAll(): Promise<INotification[]> {
        const notifications: INotification[] = await this.notification.find().populate("");
        return notifications;
    }

    public async find(notificationId: string): Promise<INotification> {
        if (isEmpty(notificationId)) throw new HttpException(400, "Missing Id Params");
        const findnotification = this.findOne(notificationId);
        if (!findnotification) throw new HttpException(409, "notification not found");
        return findnotification;
    }

    public async create(Payload: NotificationDto): Promise<INotification> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const checkIfExist = await this.notification.findOne({document_name: Payload.document_name, send_alert_on: Payload.send_alert_on})
        if (checkIfExist) throw new HttpException(400, "Already exist")
        const abc = new this.notification(Payload)
        const newnotification: INotification = await abc.save(Payload);
        return newnotification;
    }

    public async update(notificationId: string, Payload: PutNotificationDto): Promise<INotification> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findnotification = this.findOne(notificationId);
        if (!findnotification) throw new HttpException(409, "notification not found");
        const updatenotification: INotification = await this.notification.findByIdAndUpdate(notificationId, Payload , {new: true});
        return updatenotification;
    }

    public async delete(notificationId: string): Promise<INotification> {
        const drop: INotification = await this.notification.findByIdAndDelete(notificationId);
        if (!drop) throw new HttpException(409, `${notificationId} notification does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<INotification> {
        const findnotification: INotification = await this.notification.findOne({ _id: id });
        return findnotification;
    }
}

export default NotificationService;
