/* eslint-disable prettier/prettier */
import { Incentives } from '@interfaces/payroll/incentives.interface';
import { model, Schema, Document } from 'mongoose';

const incentiveSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    additionalSalary: {
      type: Schema.Types.ObjectId,
      ref: "Additional Salary"
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

const incentiveModel = model<Incentives & Document>('Incentive', incentiveSchema);
export default incentiveModel;