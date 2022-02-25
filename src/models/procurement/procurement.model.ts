/* eslint-disable prettier/prettier */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';

import { IProcurement } from '@/interfaces/procurement/procurement.interface';
import { model, Schema, Document } from 'mongoose';

const procurementSchema: Schema = new Schema(
  {
    productQuantity: {
      type: Number,
      required: true,
    },
    unitCost: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department"
    },
    expenseHeadId: {
      type: Schema.Types.ObjectId,
      ref: "ExpenseHead"
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    updatedBy:{
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    approved:{
      type: Boolean,
      default: false
    },
    actedOn:{
      type: Boolean,
      default: false
    },
    Status:{
      type: String,
      enum: ['pending', 'rejected', 'approved']
    },
    deleted:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

const procurementModel = model<IProcurement & Document>('Procurement', procurementSchema);
export default procurementModel;
