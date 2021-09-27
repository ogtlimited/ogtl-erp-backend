/* eslint-disable prettier/prettier */
// import { ISalaryStructure } from '@interfaces/payroll/salary-structure.interface';
import { ISalaryStructure } from '@/interfaces/payroll/salary-structure.interface';
import { model, Schema, Document } from 'mongoose';

const salaryStructureSchema: Schema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department"
    },
    title: {
      type: String,
      required: true,
      unique:true
    },
    deductions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SalaryComponent',
      },
    ],
    earnings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SalaryComponent',
      },
    ],
    status: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    netPay: {
      type: Number,
      required: true,
    },
    grossPay: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const salaryStructureModel = model<ISalaryStructure & Document>('SalaryStructure', salaryStructureSchema);
export default salaryStructureModel;
