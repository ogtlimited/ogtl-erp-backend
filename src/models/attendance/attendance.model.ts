/* eslint-disable prettier/prettier */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import { model, Schema, Document } from 'mongoose';

const attendanceSchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    shiftTypeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ShiftType"
    },
    statusId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    startTime: {
      type: String
    },
    endName: {
      type: String
    }
  },
  {
    timestamps: true,
  },
);

const attendanceModel = model('Attendance', attendanceSchema);
export default attendanceModel;