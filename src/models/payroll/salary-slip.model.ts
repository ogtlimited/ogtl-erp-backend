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
    salaryArrears: {
      type: Schema.Types.ObjectId,
      ref: "SalaryArrears"
    },
    deductions: [{
      type: Schema.Types.ObjectId,
      ref: "Deduction",
      default:null
    }],
    totalInWords: {
      type: String,
    },
    AccountNumber: {
      type: String,
    },
    BankCode: {
      type: String,
    },
    BeneficiaryName: {
      type: String,
    },
    Narration: {
      type: String,
    },
    Reference: {
      type: String,
    },
    Amount: {
      type: String,
    },
    salaryAfterDeductions: {
      type: Number,
      default:0
    },
    totalDeductions: {
      type: Number,
      default: 0
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
    batchId: {
      type: Schema.Types.ObjectId,
      ref: 'Batch',
    },

  },

  {
    timestamps: true,
  },
);

const salarySlipModel = model<ISalarySlip & Document>('SalarySlip', salarySlipSchema);
export default salarySlipModel;
