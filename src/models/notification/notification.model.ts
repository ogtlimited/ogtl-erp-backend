/* eslint-disable prettier/prettier */
import { INotification } from '@interfaces/notification/notification.interface';
import mongoose, { model, Schema, Document} from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper'

const notificationSchema: Schema = new mongoose.Schema(
  {
    document_name: {
      type: String,
      required: true
    },
    subject: {
        type: String,
        required: true
    },
    send_alert_on: {
        type: String,
        enum: ['SAVE', 'UPDATE', 'DELETE'],
        required: true
    },
    sender: {
      type: String,
      default: null
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

notificationSchema.pre('save', function(next) {
  const self: any = this;
  console.log('pre save fired!===============================================================');
  console.log(self.constructor.modelName)
  //new NotificationHelper(self.constructor.modelName, "SAVE").exec
  // If you call `next()` with an argument, that argument is assumed to be
  // an error.
  next();
});

const NotificationModel = model<INotification & Document>('Notification', notificationSchema);

export default NotificationModel;

