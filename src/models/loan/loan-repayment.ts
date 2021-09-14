/* eslint-disable prettier/prettier */
import { ILoanRepayment } from '@interfaces/loan/loan-repayment.interface';
import { model, Schema, Document } from 'mongoose';

const loanRepaymentSchema: Schema = new Schema(
  {
    amount_paid: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const LoanRepayment = model<ILoanRepayment & Document>('LoanRepayment', loanRepaymentSchema);
export default LoanRepayment;