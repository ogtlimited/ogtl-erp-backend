/* eslint-disable prettier/prettier */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import { IBudget } from '@/interfaces/budget/budget.interface';
import { model, Schema, Document } from 'mongoose';

const budgetSchema: Schema = new Schema(
  {
    budget: {
      type: Number,
      required: true,
    },
    availableBalance: {
      type: Number,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
      enum: ["quarterly", "monthly", "yearly"]
    },
    status: {
      type: String,
      enum: ["draft", "rejected", "approved"]
    },
    // departmentId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Department"
    // },
    // projectId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Project"
    // },
    startDate: {
      type: Date
    },
    flagAlert: {
      type: Number
    },
    endDate: {
      type: Date
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    updatedBy:{
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    active:{
      type: Boolean,
      default: false
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

const budgetModel = model<IBudget & Document>('Budget', budgetSchema);
export default budgetModel;
