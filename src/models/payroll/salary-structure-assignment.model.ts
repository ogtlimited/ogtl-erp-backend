/* eslint-disable prettier/prettier */
import { ISalaryStructureAssignment } from '@interfaces/payroll/salary-structure-assignment.interface';
import { model, Schema, Document } from 'mongoose';

const salaryStructureAssignmentSchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    salaryStructureId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SalaryStructure"
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status"
    },
    fromDate: {
      type: Date,
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