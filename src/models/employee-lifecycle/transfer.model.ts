/* eslint-disable prettier/prettier */
import { ITransfer } from '@interfaces/employee-lifecycle/transfer.interface';
import { model, Schema, Document } from 'mongoose';

const transferSchema: Schema = new Schema(
  {
    employeeId: {
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
    transferDate: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true,
  },
);

const transferModel = model<ITransfer & Document>('Transfer', transferSchema);
export default transferModel;