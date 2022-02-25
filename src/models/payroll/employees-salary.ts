/* eslint-disable prettier/prettier */
import { IEmployeesSalary } from '@interfaces/payroll/employees-salary.interface';
import { model, Schema, Document } from 'mongoose';

const employeesSalarySchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    basic: {
      type: Number
    },
    medical: {
      type: Number
    },
    housing: {
      type: Number
    },
    transport: {
      type: Number
    },
    otherAllowances: {
      type: Number
    },
    monthlySalary: {
      type: Number
    },
    totalRelief: {
      type: Number
    },
    monthlyIncomeTax: {
      type: Number
    },
    monthlyEmployeePension: {
      type: Number
    },
    netPay: {
      type: Number
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    }
  },
  {
    timestamps: true,
  },
);

const employeesSalaryModel = model<IEmployeesSalary & Document>('EmployeesSalary', employeesSalarySchema);
export default employeesSalaryModel;
