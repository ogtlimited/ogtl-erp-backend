/* eslint-disable prettier/prettier */
// import { Incentives } from '@interfaces/payroll/incentives.interface';
import { model, Schema} from 'mongoose';

const incentiveSchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    title: {
      type: String,
      required: true
    },
    salaryComponent: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SalaryComponent"
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
    payrollDate: {
      type: Date
    },
    incentiveAmount: {
      type: Number
    }
  },
  {
    timestamps: true,
  },
);

const incentiveModel = model('Incentive', incentiveSchema);
export default incentiveModel;