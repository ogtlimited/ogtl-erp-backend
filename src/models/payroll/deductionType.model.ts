/* eslint-disable prettier/prettier */
import { model, Schema} from 'mongoose';

const deductionTypeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    type:{
      type: String,
      enum: ["Deduction", "Extra Time"],
      
    },
    description: {
      type: String,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status"
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
    amount: {
      type: Number,
    },
    departmentId : {
      type: Schema.Types.ObjectId,
      ref: "Department"
    },
    percentage: {
      type: Number,
    }
  },
  {
    timestamps: true,
  },
);

const deductionTypeModel = model('DeductionType', deductionTypeSchema);
export default deductionTypeModel;