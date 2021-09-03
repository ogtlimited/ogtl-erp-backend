/* eslint-disable prettier/prettier */
import { model, Schema} from 'mongoose';

const deductionSchema: Schema = new Schema(
  {
    deductionTypeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "DeductionType"
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        rquired: true,
        ref: "Employee"
      },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
    quantity: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true,
  },
);

const deductionModel = model('Deduction', deductionSchema);
export default deductionModel;