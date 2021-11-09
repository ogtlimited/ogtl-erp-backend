import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper'
import { IJobOpening } from '@interfaces/recruitment/job_opening.interface';

const jobOpeningSchema: Schema = new Schema({
  job_title: {
    type: String,
    required: true,
  },
  designation_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Designation',
    default: null,
  },
  project_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
    default: null,
  },
  status: {
    type: String,
    enum: ['CLOSED', 'OPEN'],
    default: 'OPEN',
  },
  description: {
    type: String,
    default: null,
  },
});


jobOpeningSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
jobOpeningSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
jobOpeningSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});

const jobOpeningModel = model<IJobOpening & Document>('JobOpening', jobOpeningSchema);

export default jobOpeningModel;
