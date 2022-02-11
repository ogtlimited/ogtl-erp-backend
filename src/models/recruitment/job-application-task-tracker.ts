/* eslint-disable prettier/prettier */
import {model,Schema,Document} from "mongoose"
import { IJobApplicationsTasks } from '@interfaces/recruitment/job-applications-task';
// import NotificationHelper from '@utils/helper/notification.helper';

const jobApplicationsTaskSchema: Schema = new Schema({
  in_house_agent: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
    default: null,
  },
  sieving: {
    type: Number,
    default: 0
  },
  phone_screening: {
   type: Number,
    default: 0
  },
  scheduled_for_interview: {
    type: Number,
    default: 0
  },
  total_assigned_records: {
    type: Number,
    default: 0
  }
},{ timestamps: true})

// jobApplicantionsTaskSchema.post('save', function(doc) {
//   const self: any = this;
//   console.log(self.constructor.modelName)
//   new NotificationHelper(self.constructor.modelName, "SAVE").exec()
// });
// jobApplicantionsTaskSchema.post('update', function(doc) {
//   const self: any = this;
//   console.log(self.constructor.modelName)
//   new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
// });
// jobApplicantionsTaskSchema.post('delete', function(doc) {
//   const self: any = this;
//   console.log(self.constructor.modelName)
//   new NotificationHelper(self.constructor.modelName, "DELETE").exec()
// });

const jobApplicationsTaskModel = model<IJobApplicationsTasks & Document>('JobApplicationTask',jobApplicationsTaskSchema)

export default jobApplicationsTaskModel
