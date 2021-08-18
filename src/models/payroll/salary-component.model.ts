/* eslint-disable prettier/prettier */
import { SalaryComponent } from '@interfaces/payroll/salary-component.interface';
import { model, Schema, Document } from 'mongoose';

const salaryComponentSchema: Schema = new Schema(
  {
    salaryComponent: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SalaryComponent"
    },
    salaryComponentAbbr: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    incentiveAmount: {
      type: Number,
      default:0
    },
    isTaxApplicable: {
      type: Boolean,
      required: true,
    },
    dependsOnPaymentDays: {
      type: Boolean,
      default: false
    },
    type:{
        enum: ["deduction", "earning"]
    }
  },
  {
    timestamps: true,
  },
);

const salaryComponentModel = model<SalaryComponent & Document>('SalaryComponent', salaryComponentSchema);
export default salaryComponentModel;