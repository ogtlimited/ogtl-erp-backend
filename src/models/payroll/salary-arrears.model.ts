/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';

const salaryArrearsSchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    employeeSalary: {
      type: Object,
    },
    amount: {
      type: Number,
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

const salaryArrearsModel = model<Document>('SalaryArrears', salaryArrearsSchema);
export default salaryArrearsModel;
