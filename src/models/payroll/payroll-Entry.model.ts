/* eslint-disable prettier/prettier */
import { PayRollEntry } from '@interfaces/payroll/payroll-Entry.interface';
import { model, Schema, Document } from 'mongoose';

const payRollEntrySchema: Schema = new Schema(
  {
    branch: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Branch"
    },
    department: {
      type: Schema.Types.ObjectId,
      required:true,
      ref: "Department"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    payrollFrequency: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PayrollFrequency"
    },
    paymentAccount: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "paymentAccount"
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    salarySlipsCreated: {
      type: Boolean,
      required:true
    },
    validateAttendance: {
      type: Boolean,
      required:true
    },
    salarySlipsSubmitted: {
      type: Boolean,
      required:true
    },
    deductTaxForUnsubmittedTaxExemptionProof: {
      type: Boolean,
      required:true
    },
    deductTaxForUnclaimedEmployeeBenefits: {
      type: Boolean,
      required:true
    },
    numberOfEmployees: [ 
      {
          type: Schema.Types.ObjectId,
          ref: "Employee"
      }
  ]
  },
  {
    timestamps: true,
  },
);

const payRollEntryModel = model<PayRollEntry & Document>('PayRollEntry', payRollEntrySchema);
export default payRollEntryModel;