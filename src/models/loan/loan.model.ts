/* eslint-disable prettier/prettier */
import { Loan } from '@interfaces/loan/loan.interface';
import { model, Schema, Document } from 'mongoose';

const loanSchema: Schema = new Schema(
  {
    applicant_type_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ApplicationType'
    },
    applicant_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Employee'
    },
    loan_type_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'LoanType'
    },
    loan_application_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'LoanApplication'
    },
    repay_from_salary: {
      type: Boolean,
      required: true
    },
    loan_amount: {
        type: Number,
        required: true
    },
    repayment_start_date: {
        type: Date,
        required: true
    },
    repayment_method: {
        type: String,
        required: true
    },
    mode_of_payment_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ModeOfPayment'
    },
    loan_account_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    payment_account_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    interest_income_account_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    status_id: {
        type: String,
        required: true
    },
  },
  {
    timestamps: true,
  },
);

const LoanModel = model<Loan & Document>('Loan', loanSchema);
export default LoanModel;