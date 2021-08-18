import {model,Schema,Document} from "mongoose"
import { JobOpening, Status } from '@interfaces/recruitment/job_opening.interface';

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
  campaign_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Campaign',
    default: null,
  },
  status:{
    type: String,
    enum: Status,
    default: Status.OPEN
  },
  description:{
    type: String,
    default: null
  }
})

const jobOpeningModel = model<JobOpening & Document>('JobOpening',jobOpeningSchema)

export default jobOpeningModel
