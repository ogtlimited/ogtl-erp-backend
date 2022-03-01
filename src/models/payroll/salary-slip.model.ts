/* eslint-disable prettier/prettier */
import { ISalarySlip} from '@interfaces/payroll/salary-slip.interface';
import { model, Schema, Document } from 'mongoose';

const salarySlipSchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    employeeSalary: {
      type: Object,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department"
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status"
    },
    deductions: [{
      type: Schema.Types.ObjectId,
      ref: "Deduction",
      default:null
    }],
    totalInWords: {
      type: String,
    },
    netPay: {
      type: Number,
      required: true,
    },
    month: {
      type: Date,
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

const salarySlipModel = model<ISalarySlip & Document>('SalarySlip', salarySlipSchema);
export default salarySlipModel;
