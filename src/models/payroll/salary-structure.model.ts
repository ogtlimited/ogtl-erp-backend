/* eslint-disable prettier/prettier */
// import { ISalaryStructure } from '@interfaces/payroll/salary-structure.interface';
import { ISalaryStructure } from '@/interfaces/payroll/salary-structure.interface';
import { model, Schema } from 'mongoose';

const salaryStructureSchema: Schema = new Schema(
  {
    payrollFrequency: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'PayrollFrequency',
    },
    salaryDeductions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SalaryDeduction',
      },
    ],
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Status',
    },
    // currency: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Currency',
    // },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
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

const salaryStructureModel = model<ISalaryStructure & Document>('SalaryStructure', salaryStructureSchema);
export default salaryStructureModel;
