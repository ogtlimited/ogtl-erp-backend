/* eslint-disable prettier/prettier */
import {model,Schema,Document} from "mongoose"
import { IJobApplicant } from '@interfaces/recruitment/job_applicant.interface';

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
  email_address: {
   type:String,
    required: true,
  },
  job_opening_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'JobOpening',
    default: null,
  },
  application_source:{
    type: String,
    default:null,
  },
  status:{
    type: String,
    enum: ["Open","Replied","Rejected","Hold","Accepted"],
    default: "Open"
  },
  resume_attachment:{
    type: String,
    default: null
  },
  cover_letter:{
    type: String,
    default: null
  },
  video_attachment:{
    type: String,
    default: null
  }
})

const jobApplicantModel = model<IJobApplicant & Document>('JobApplicant',jobApplicantSchema)

export default jobApplicantModel
