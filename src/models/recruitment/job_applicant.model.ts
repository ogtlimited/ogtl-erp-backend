/* eslint-disable prettier/prettier */
import {model,Schema,Document} from "mongoose"
import { JobApplicant,JobApplicantStatus } from '@interfaces/recruitment/job_applicant.interface';

const jobApplicantSchema: Schema = new Schema({
  applicant_name: {
    type: String,
    required: true,
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
    enum: JobApplicantStatus,
    default: JobApplicantStatus.OPEN
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

const jobApplicantModel = model<JobApplicant & Document>('JobApplicant',jobApplicantSchema)

export default jobApplicantModel
