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
    salaryDeduction: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SalaryDeduction"
    },
    designation: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Designation"
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department"
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
      ref: "Loans"
    },
    deductions: [{
      type: Schema.Types.ObjectId,
      ref: "Deduction"
    }],
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
    ],
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