/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */

import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper';
import { IDefaultJobOpening, IJobOpening } from '@interfaces/recruitment/job_opening.interface';

const jobOpeningSchema: Schema = new Schema({
  job_title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  designation_id: {
    type: Schema.Types.ObjectId,
    ref: 'Designation',
    default: null,
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    default: null,
  },
  status: {
    type: String,
    enum: ['CLOSED', 'OPEN'],
    default: 'OPEN',
  },
  type: {
    type: String,
    enum: ['Full Time', 'Part Time'],
    default: 'Full Time',
  },
  description: {
    type: String,
    default: null,
  },
  experience: {
    type: Number,
    default: null,
  },
  vacancy: {
    type: Number,
    default: null,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    default: null,
  },
},
  {
    timestamps: true,
  },);

const DefaultjobOpeningSchema: Schema = new Schema({
  job_title: {
    type: String,
    required: true,
  }
});

jobOpeningSchema.post('save', function (doc) {
  const self: any = this;
  console.log(self.constructor.modelName);
  new NotificationHelper(self.constructor.modelName, 'SAVE').exec();
});
jobOpeningSchema.post('update', function (doc) {
  const self: any = this;
  console.log(self.constructor.modelName);
  new NotificationHelper(self.constructor.modelName, 'UPDATE').exec();
});
jobOpeningSchema.post('delete', function (doc) {
  const self: any = this;
  console.log(self.constructor.modelName);
  new NotificationHelper(self.constructor.modelName, 'DELETE').exec();
});

const jobOpeningModel = model<IJobOpening & Document>('JobOpening', jobOpeningSchema);
export const defaultJobOpeningModel = model<IDefaultJobOpening & Document>('DefaultJobOpening', DefaultjobOpeningSchema);

export default jobOpeningModel;
