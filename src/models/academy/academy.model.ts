/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';

const academySchema: Schema = new Schema(
  {
    alt_mobile_number: {
      type: String,
    },
    certifications: {
      type: String,
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
    interested_position: {
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
    // timestamp: {
    //   type: String,
    // },
    user_name: {
      type: String,
      required: true,
    },
    stack: {
        type: String,
      },
    mode_of_engagement: {
        type: String,
    },
    years_of_experience: {
        type: String,
    }
  },
  {
    timestamps: true,
  },
);

const academyModel = model('Academy_records', academySchema);
export default academyModel;
