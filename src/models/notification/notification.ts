/* eslint-disable prettier/prettier */
import { INotification } from '@interfaces/notification/notification.interface';
import { model, Schema, Document } from 'mongoose';

const notificationSchema: Schema = new Schema(
  {
    document_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Model'
    },
    subject: {
        type: String,
        required: true
    },
    send_alert_on: {
        type: String,
        required: true,
        default: 'save'
    },
    sender: {
      type: String,
      required: true
    },
    receiver_role: [{
        type: String,
        required: true
      }],
    disabled: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        required: true
    },
  },
  {
    timestamps: true,
  },
);

const NotificationModel = model<INotification & Document>('Notification', notificationSchema);
export default NotificationModel;