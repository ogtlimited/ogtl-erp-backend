/* eslint-disable prettier/prettier */
import {model,Schema,Document} from "mongoose"
import { ITest } from '@interfaces/recruitment/test.interface';

const testSchema: Schema = new Schema({
  test_type:{
    type:String,
    enum:["Phone Screening","Typing Test","Excel Test","Formal Writing","Soft Skills"],
    required: true
  },
  job_applicant_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'JobApplicant',
    default: null,
  },
  status:{
    type: String,
    enum: ["Passed","Failed"],
    default: null
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

const testModel = model<ITest & Document>('Test',testSchema)

export default testModel
