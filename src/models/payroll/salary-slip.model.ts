/* eslint-disable prettier/prettier */
import { ISalarySlip} from '@interfaces/payroll/salary-slip.interface';
import { model, Schema, Document } from 'mongoose';

const salarySlipSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    salaryStructure: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SalaryStructure"
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status"
    },
    loans: [{
      type: Schema.Types.ObjectId,
      ref: "Loans"
    }],
    deductions: [{
      type: Schema.Types.ObjectId,
      ref: "Deduction"
    }],
    totalInWords: {
      type: String,
      required: true,
    },
    netPay: {
      type: Number,
      required: true,
    },
    month: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  },
  
  {
    timestamps: true,
  },
);

const salarySlipModel = model<ISalarySlip & Document>('salarySlipModel', salarySlipSchema);
export default salarySlipModel;