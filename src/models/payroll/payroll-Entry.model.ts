/* eslint-disable prettier/prettier */
import { IPayRollEntry } from '@/interfaces/payroll/payroll-Entry.interface';
import { model, Schema } from 'mongoose';

/*
 Reconsider having an array field: employees

*/
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
      ref: "PaymentAccount"
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
    numberOfEmployees: 
      {
          type: Number,
          required: true
      },
    employees:[
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

const payRollEntryModel = model<IPayRollEntry & Document>('PayRollEntry', payRollEntrySchema);
export default payRollEntryModel;