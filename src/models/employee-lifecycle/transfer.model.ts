/* eslint-disable prettier/prettier */
import { Transfer } from '@interfaces/employee-lifecycle/transfer.interface';
import { model, Schema, Document } from 'mongoose';

const transferSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    employeeID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department"
    },
    branch:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Branch"
    },
    transferDetails:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "TransferDetails"
    },
    dateOfJoining: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true,
  },
);

const transferModel = model<Transfer & Document>('Transfer', transferSchema);
export default transferModel;