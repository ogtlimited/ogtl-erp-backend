import {model,Schema,Document} from "mongoose"
import { JobOffer,JobOfferStatus } from '@interfaces/recruitment/job_offer.interface';

const jobOfferSchema: Schema = new Schema({
  job_applicant_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'JobApplicant',
    default: null,
  },
  status:{
    type: String,
    enum: JobOfferStatus,
    default: JobOfferStatus.AWAITING_RESPONSE
  },
  offer_date:{
    type: Date,
    default: null
  },
  designation_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Designation',
    default: null,
  },
  job_offer_terms:[{
    type: String,
    default: null
  }],
  terms_and_conditions:{
    type:String,
    default:null
  }
})

const jobOfferModel = model<JobOffer & Document>('JobOffer',jobOfferSchema)

export default jobOfferModel
