/* eslint-disable prettier/prettier */
import { model, Schema} from 'mongoose';

const deductionSchema: Schema = new Schema(
  {
    deductionTypeId: {
      type: Schema.Types.ObjectId,
      ref: "DeductionType"
    },
    incidentTypeId: {
      type: Schema.Types.ObjectId,
      ref: "Incident"
    },
    description: {
      type: String,
      default: null
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
    amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const deductionModel = model('Deduction', deductionSchema);
export default deductionModel;

