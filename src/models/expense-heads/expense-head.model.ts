/* eslint-disable prettier/prettier */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import { IExpenseHead } from '@/interfaces/expense-head/expense-head.interface';
import { model, Schema } from 'mongoose';

const expenseHeadSchema: Schema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    availableBalance: {
      type: Number,
    },
    title: {
      type: String,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department"
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
    budgetId: {
      type: Schema.Types.ObjectId,
      ref: "Budget"
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