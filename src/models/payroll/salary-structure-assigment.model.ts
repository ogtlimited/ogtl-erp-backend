/* eslint-disable prettier/prettier */
import { SalaryStructureAssignment } from '@interfaces/payroll/salary-structure-assignment.interface';
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
    incomeTaxSlab: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "IncomeTaxSlab"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    fromDate: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const salaryStructureAssignmentModel = model<SalaryStructureAssignment & Document>('SalaryStructureAssignment', salaryStructureAssignmentSchema);
export default salaryStructureAssignmentModel;