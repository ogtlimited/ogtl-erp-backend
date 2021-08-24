/* eslint-disable prettier/prettier */
import { ISalaryComponent } from '@interfaces/payroll/salary-component.interface';
import { model, Schema, Document } from 'mongoose';

const salaryComponentSchema: Schema = new Schema(
  {
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status"
    },
    salaryComponentAbbr: {
      type: String,
      required: true,
    },
    title: {
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
        enum: ["deduction", "earning"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  },
  {
    timestamps: true,
  },
);

const salaryComponentModel = model<ISalaryComponent & Document>('SalaryComponent', salaryComponentSchema);
export default salaryComponentModel;