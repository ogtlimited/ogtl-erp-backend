/* eslint-disable prettier/prettier */
import {model,Schema,Document} from "mongoose"
import { IJobApplicant } from '@interfaces/recruitment/job_applicant.interface';
import NotificationHelper from '@utils/helper/notification.helper';

const jobApplicantSchema: Schema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  highest_qualification: {
    type: String,
    required: true,
  },
  certifications: {
    type: String,
    required: true,
  },
  languages_spoken: {
    type: Array,
    required: true,
  },
  referal_name: {
    type: Array,
  },
  email_address: {
   type:String,
    required: true,
  },
  alternate_mobile: {
   type:String,
  },
  job_opening_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'JobOpening',
    default: null,
  },
  default_job_opening_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'DefaultJobOpening',
    default: null,
  },
  application_source:{
    type: String,
    default:null,
  },
  process_stage:{
    type: String,
    enum: ["open","sieving","phone screening","interview scheduled"],
    default: "open"
  },
  // status:{
  //   type: String,
  //   enum: ["not in location","not a graduate","declined"],
  //   default: "open"
  // },
  resume_attachment:{
    type: String,
    default: null
  },
  cover_letter:{
    type: String,
    default: null
  },
  rep_sieving_call: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
    default: null,
  },
  interview_date: {
    type: Date,
    default: null
  },
  interview_status: {
    type: String,
    enum: [
      "Open","Scheduled for interview","Not interested", "Not a graduate", "Not in job location",
      "Failed screening","Missed call","call back"],
    default: "Open"
  },
},
  {
    timestamps: true,
  })


jobApplicantSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
jobApplicantSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
jobApplicantSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});

const jobApplicantModel = model<IJobApplicant & Document>('JobApplicant',jobApplicantSchema)

export default jobApplicantModel
