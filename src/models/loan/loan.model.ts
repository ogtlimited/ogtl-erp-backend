/* eslint-disable prettier/prettier */
import { Loan } from '@interfaces/loan/loan.interface';
import { model, Schema, Document } from 'mongoose';

const loanSchema: Schema = new Schema(
  {
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
        type: String,
        required: true
    },
    repayment_start_date: {
        type: String,
        required: true
    },
    mode_of_payment_id: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'ModeOfPayment'
    },
    loan_account_id: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'Account'
    },
    payment_account_id: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'Account'
    },
    interest_income_account_id: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'Account'
    },
    repayment_id: [{
      type: Schema.Types.ObjectId,
      ref: 'LoanRepayment'
    }],
    status: {
        type: String,
        default: null
    },
    completed: {
      type: Boolean,
      default: false
    },
    loan_balance: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const LoanModel = model<Loan & Document>('Loan', loanSchema);
export default LoanModel;