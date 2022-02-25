/* eslint-disable prettier/prettier */
import {model,Schema,Document} from "mongoose"
import { ITest } from '@interfaces/recruitment/test.interface';
import NotificationHelper from '@utils/helper/notification.helper';

const testSchema: Schema = new Schema({
  job_applicant_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'JobApplicant',

  },
  status:{
    type: String,

  },

  notes:{
    type:String,

  },
  interviewer:{
    type:String,

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

  },
  attention_to_details_test:{
    type:String,

  },
  multitasking_skills_test:{
    type:String,

  },
  dictation_test:{
    type:String,

  },
  professional_writing_email_test:{
    type:String,

  },
  send_for_testGorilla_skype_interview:{
    type:String,

  },
  testGorilla_invitation_date:{
    type: Date,

  },
  assessment_completion_date:{
    type: Date,

  },
  stage:{
    type:String,

  },
  average_score:{
    type: String,

  },
  personality_score:{
    type: String,

  },
  attention_to_detail_score:{
    type: String,

  },
  communication_score:{
    type: String,

  },
  disc_profile_score:{
    type: String,

  },
  english_score:{
    type: String,

  },
  filed_out_only_once_from_ip_address:{
    type:String,

  },
  webcam_enabled:{
    type:String,

  },
  full_screen_mode_always_active:{
    type:String,

  },
  mouse_always_in_assessment_window:{
    type:String,

  },
  interviewer_rating:{
    type:String,

  },
  interview_status:{
    type:String,

  },

},
  {
    timestamps: true,
  },)
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
