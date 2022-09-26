/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';

const academySchema: Schema = new Schema(
  {
    alt_mobile_number: {
      type: String,
    },
    certifications: {
      type: Array,
    },
    consent: {
      type: String,
    },
    fav_programming_lang: {
      type: Array,
    },
    first_name: {
      type: String,
    },
    highest_qualification_attained: {
      type: String,
    },
    weekly_hours: {
      type: String,
    },
    other_option: {
      type: String,
    },
    interested_program: {
      type: String,
    },
    last_name: {
      type: String
    },
    middle_name: {
      type: String
    },
    mobile_number: {
      type: String,
    },
    application_date: {
      type: String,
    },
    user_name: {
      type: String,
      required: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    // },
    stack: {
        type: String,
      },
    mode_of_engagement: {
        type: String,
    },
    years_of_experience: {
        type: String,
    },
    gender: {
        type: String,
    },
    cv: {
        type: String,
        default: null
    },
    process_stage:{
        type: String,
        enum: ["open","sieving","phone screening"],
        default: "open"
      },
    rep_sieving_call: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    },
    interview_status: {
        type: String,
        enum: ["open","acknowledgement sent","onboarded"],
        default: "open"
    },
  },
  {
    timestamps: true,
  },
);

const academyModel = model('Academy_records', academySchema);
export default academyModel;
