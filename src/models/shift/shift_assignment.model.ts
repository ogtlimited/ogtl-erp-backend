/* eslint-disable prettier/prettier */
import { ShiftAssignment } from '@interfaces/shift-interface/shift_assignment.interface';
import { model, Schema, Document } from 'mongoose';

const shiftAssignmentSchema: Schema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    shift_type_id: {
      type: Schema.Types.ObjectId,
      ref: "ShiftType",
      required: true,
    },
    assignment_date: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

const shiftAssignmentModel = model<ShiftAssignment & Document>('ShiftAssignment', shiftAssignmentSchema);

export default shiftAssignmentModel;
