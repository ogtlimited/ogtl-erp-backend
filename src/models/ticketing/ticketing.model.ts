/* eslint-disable prettier/prettier */

import mongoose, { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper'
import { ITicketing } from '@interfaces/ticketing/ticketing.interface';

const ticketingSchema: Schema = new Schema({
    employee_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    status: {
      type: String,
      enum: ['Open', 'Processing', 'Resolved'],
      default: 'Open',
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      default: null,
    },

    title:{
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },);

ticketingSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
ticketingSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
ticketingSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});


const ticketingModel = model<ITicketing & Document>('Ticketing', ticketingSchema);

export default ticketingModel;
