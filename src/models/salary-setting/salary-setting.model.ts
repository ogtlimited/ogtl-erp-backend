
/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import { ISalarySetting } from '@interfaces/salary-settings/salary_settings.interface';

const salarySettingSchema: Schema = new Schema(
  {
    title:{
      type:String,
      required:true
    },
    percentage:{
      type: Number,
      required:true
    },
    type:{
      type: String,
      enum: ['earning', 'deduction'],
    },
    startRange:{
      type:Number
    },
    endRange:{
      type:Number
    }
    // status:{
    //   type: Boolean,
    // },
  },
  {
    timestamps: true,
  },
)

const salarySettingModel = model<ISalarySetting & Document>('SalarySetting',salarySettingSchema);
export default salarySettingModel;
