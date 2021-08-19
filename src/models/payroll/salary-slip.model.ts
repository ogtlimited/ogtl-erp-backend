/* eslint-disable prettier/prettier */
import { SalaryComponent } from '@interfaces/payroll/salary-component.interface';
import { model, Schema, Document } from 'mongoose';

const salaryComponentSchema: Schema = new Schema(
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
    salaryDeduction: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SalaryDeduction"
    },
    branch: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Branch"
    },
    Status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    payRollEntry: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PayRollEntry"
    },
    bank: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Bank"
    },
    loans: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Loans"
    },
    totalInWords: {
      type: String,
      required: true,
    },
    totalWorkingDays: {
      type: Number,
      required: true,
    },
    paymentDays: {
      type: Number,
      required: true,
    },
    totalWorkingHours: {
      type: Number,
      required: true,
    },
    totalDeduction: {
      type: Number,
      required: true,
    },
    netPay: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Boolean,
      required: true,
    },
    endDate: {
      type: Boolean,
      required: true,
    },
    deduction:[
        {
            type: Schema.Types.ObjectId,
            ref: "Deduction"
        }
    ]
  },
  {
    timestamps: true,
  },
);

const salaryComponentModel = model<SalaryComponent & Document>('SalaryComponent', salaryComponentSchema);
export default salaryComponentModel;