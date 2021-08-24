/* eslint-disable prettier/prettier */
import { ISalaryStructureAssignment } from '@interfaces/payroll/salary-structure-assignment.interface';
import { model, Schema, Document } from 'mongoose';

const salaryStructureAssignmentSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department"
    },
    salaryStructure: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SalaryStructure"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    fromDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
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

const salaryStructureAssignmentModel = model<ISalaryStructureAssignment & Document>('SalaryStructureAssignment', salaryStructureAssignmentSchema);
export default salaryStructureAssignmentModel;