/* eslint-disable prettier/prettier */
import { IPayRollEntry } from '@/interfaces/payroll/payroll-Entry.interface';
import { model, Schema, Document } from 'mongoose';

/*
 Reconsider having an array field: employees

*/
const payRollEntrySchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Branch"
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department"
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    amount: {
      type: Number,
    }
  },
  {
    timestamps: true,
  },
);

const payRollEntryModel = model<IPayRollEntry & Document>('PayRollEntry', payRollEntrySchema);
export default payRollEntryModel;