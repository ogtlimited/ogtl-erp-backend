/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */

import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper';
import { IIdRequest } from '@/interfaces/procurement/idrequest.interface';

const idRequestSchema: Schema = new Schema({
  


  employee_id: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    default: null,
  },
  date: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  
  status: {
    type: String,
    enum: ['open','sent to production','Id card created','submitted to HR', 'issued to employee'],
    default : 'open',
},
 
},
  {
    timestamps: true,
  },);



idRequestSchema.post('save', function (doc) {
  const self: any = this;
  console.log(self.constructor.modelName);
  new NotificationHelper(self.constructor.modelName, 'SAVE').exec();
});
idRequestSchema.post('update', function (doc) {
  const self: any = this;
  console.log(self.constructor.modelName);
  new NotificationHelper(self.constructor.modelName, 'UPDATE').exec();
});
idRequestSchema.post('delete', function (doc) {
  const self: any = this;
  console.log(self.constructor.modelName);
  new NotificationHelper(self.constructor.modelName, 'DELETE').exec();
});

const idRequestModel = model<IIdRequest & Document>('idRequest', idRequestSchema);


export default idRequestModel;
