/* eslint-disable prettier/prettier */
import { IEmployeesSalary } from '@interfaces/payroll/employees-salary.interface';
import { model, Schema, Document } from 'mongoose';

const salarySettingSchema: Schema = new Schema(
  {
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
    CRA:{
      type: Number
    },
    monthlyEmployeePension:{
      type: Number
    },
    CRABonusAmount:{
      type: Number
    },
    active: {
      type: Boolean,
      default: false
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

const salarySettingModel = model('SalarySetting', salarySettingSchema);
export default salarySettingModel;
