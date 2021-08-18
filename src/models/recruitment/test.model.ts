import {model,Schema,Document} from "mongoose"
import { Test,TestStatus } from '@interfaces/recruitment/test.interface';

const testSchema: Schema = new Schema({
  job_applicant_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'JobApplicant',
    default: null,
  },
  status:{
    type: String,
    enum: TestStatus,
    default: null
  },
  hr_user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  score:{
    type: String,
    default: null
  },
  interview_date: {
    type: Date,
    default:null
  },
  phone_number:{
    type: String,
    default: null
  },
  notes:{
    type:String,
    default:null
  }
})

const testModel = model<Test & Document>('Test',testSchema)

export default testModel
