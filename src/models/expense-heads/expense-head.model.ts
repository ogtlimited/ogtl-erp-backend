/* eslint-disable prettier/prettier */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
// import { IExpenseHead } from '@/interfaces/expense-head/expense-head.interface';
import { model, Schema, Document } from 'mongoose';
import { IExpenseHead } from '@/interfaces/expense-head/expense-head.interface';

const expenseHeadSchema: Schema = new Schema(
  {
    expenseHeadDraftId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ExpenseHeadDraft"
    },
    budgetId: {
      type: Schema.Types.ObjectId,
      ref: "Budget"
    },
    availableBalance: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    startDate: {
      type: Date
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

const expenseHeadModel = model<IExpenseHead & Document>('ExpenseHead', expenseHeadSchema);
export default expenseHeadModel;
