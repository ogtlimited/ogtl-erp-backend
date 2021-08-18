/* eslint-disable prettier/prettier */
import { SalaryStructure } from '@interfaces/payroll/salary-structure.interface';
import { model, Schema, Document } from 'mongoose';

const salaryStructureSchema: Schema = new Schema(
  {
    payrollFrequency: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PayrollFrequency"
    },
    salaryDeductions: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SalaryDeduction"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    currency: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Currency"
    },
    hourRate: {
      type: Number,
      required: true,
    },
    earning: {
      type: Number,
      required: true,
    },
    netPay: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const salaryStructureModel = model<SalaryStructure & Document>('SalaryStructure', salaryStructureSchema);
export default salaryStructureModel;