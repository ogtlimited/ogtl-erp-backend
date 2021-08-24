/* eslint-disable prettier/prettier */
import { LoanType } from '@interfaces/loan/loan-type.interface';
import { model, Schema, Document } from 'mongoose';

const loanTypeSchema: Schema = new Schema(
  {
    loan_name: {
      type: String,
      required: true,
    },
    maximum_loan_amount: {
      type: String,
      required: true
    },
    rate_of_interest: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const LoanTypeModel = model<LoanType & Document>('LoanType', loanTypeSchema);
export default LoanTypeModel;