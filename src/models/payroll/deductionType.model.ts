/* eslint-disable prettier/prettier */
import { model, Schema} from 'mongoose';

const deductionTypeSchema: Schema = new Schema(
  {
    departmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department"
    },
    title: {
      type: String,
      required: true
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
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
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const deductionTypeModel = model('DeductionType', deductionTypeSchema);
export default deductionTypeModel;