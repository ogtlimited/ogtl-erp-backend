/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';

const payrollArchiveSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    salarySlip: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SalarySlip"
    },
    paid: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed"]
    },
    paidAt: {
      type: Date
    }
  },
  {
    timestamps: true,
  },
);

const payRollArchiveModel = model<Document>('PayrollArchive', payrollArchiveSchema);
export default payRollArchiveModel;
