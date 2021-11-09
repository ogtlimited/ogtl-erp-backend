/* eslint-disable prettier/prettier */
import {model,Schema,Document} from "mongoose"
import { ITest } from '@interfaces/recruitment/test.interface';
import NotificationHelper from '@utils/helper/notification.helper';

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
testSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
testSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
testSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});

const testModel = model<ITest & Document>('Test',testSchema)

export default testModel
