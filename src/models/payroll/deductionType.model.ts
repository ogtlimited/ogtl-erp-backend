/* eslint-disable prettier/prettier */
import { model, Schema} from 'mongoose';

const deductionTypeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
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