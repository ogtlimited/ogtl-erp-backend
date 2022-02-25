/* eslint-disable prettier/prettier */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import { IExpenseHead } from '@/interfaces/expense-head/expense-head.interface';
import { model, Schema, Document } from 'mongoose';

const expenseHeadDraftSchema: Schema = new Schema(
  {
    flagAlert: {
      type: Number
    },
    title: {
      type: String,
      unique:true
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department"
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
    deleted:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

const expenseHeadDraftModel = model<IExpenseHead & Document>('ExpenseHeadDraft', expenseHeadDraftSchema);
export default expenseHeadDraftModel;
