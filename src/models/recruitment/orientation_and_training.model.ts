/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */

import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper';
import { IOrientation } from '@interfaces/recruitment/orientation_and_training.interface';

const orientationSchema: Schema = new Schema({
  


  department_id: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    default: null,
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['training', 'orientation'],
  },
  attendance : {
    type: String,
    
  },
  employee_id : [{
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  }]
 
},
  {
    timestamps: true,
  },);



orientationSchema.post('save', function (doc) {
  const self: any = this;
  console.log(self.constructor.modelName);
  new NotificationHelper(self.constructor.modelName, 'SAVE').exec();
});
orientationSchema.post('update', function (doc) {
  const self: any = this;
  console.log(self.constructor.modelName);
  new NotificationHelper(self.constructor.modelName, 'UPDATE').exec();
});
orientationSchema.post('delete', function (doc) {
  const self: any = this;
  console.log(self.constructor.modelName);
  new NotificationHelper(self.constructor.modelName, 'DELETE').exec();
});

const orientationModel = model<IOrientation & Document>('Orientation', orientationSchema);


export default orientationModel;
