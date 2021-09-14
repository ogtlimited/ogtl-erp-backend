/* eslint-disable prettier/prettier */
import { LoanApplication } from '@interfaces/loan/loan-application.interface';
import { model, Schema, Document } from 'mongoose';

const loanApplicationSchema: Schema = new Schema(
  {
    applicant_name_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    loan_type_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "LoanType"
    },
    loan_amount: {
      type: String,
      required: true,
      ref: "SalaryComponent"
    },
    status: {
        enum: ["open", "approved", "rejected"]
    },
    reason: {
      type: String,
      default: null
    },
    repayment_method: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const LoanApplicationModel = model<LoanApplication & Document>('LoanApplication', loanApplicationSchema);
export default LoanApplicationModel;