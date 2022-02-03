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
  },
  interviewer:{
    type:String,
    default: null
  },
  email_address:{
    type:String,
    default:null
  },
  typing_speed_score:{
    type: String,
    default:0
  },
  typing_accuracy_score:{
    type:String,
    default:0
  },
  accent_test_score:{
    type:String,
    default:null
  },
  attention_to_details_test:{
    type:String,
    default:null
  },
  multitasking_skills_test:{
    type:String,
    default:null
  },
  dictation_test:{
    type:String,
    default:null
  },
  professional_writing_email_test:{
    type:String,
    default:null
  },
  send_for_testGorilla_skype_interview:{
    type:String,
    default:null
  },
  testGorilla_invitation_date:{
    type: Date,
    default:null
  },
  assessment_completion_date:{
    type: Date,
    default:null
  },
  stage:{
    type:String,
    default:null
  },
  average_score:{
    type: String,
    default:null
  },
  personality_score:{
    type: String,
    default:null
  },
  attention_to_detail_score:{
    type: String,
    default:null
  },
  communication_score:{
    type: String,
    default:null
  },
  disc_profile_score:{
    type: String,
    default:null
  },
  english_score:{
    type: String,
    default:null
  },
  filed_out_only_once_from_ip_address:{
    type:String,
    default:null
  },
  webcam_enabled:{
    type:String,
    default:null
  },
  full_screen_mode_always_active:{
    type:String,
    default:null
  },
  mouse_always_in_assessment_window:{
    type:String,
    default:null
  },
  interviewer_rating:{
    type:String,
    default:null
  },

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
