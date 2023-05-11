/* eslint-disable prettier/prettier */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import { model, Schema } from 'mongoose';

const attendanceSchema: Schema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    ogId: {
      type: String,
      required: true,
    },
    shiftTypeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ShiftType"
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department"
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
    clockInTime: {
      type: String
    },
    clockOutTime: {
      type: String
    },
    hoursWorked:{
      type: Number,
      default: 0
    },
    minutesWorked:{
      type: Number,
      default: 0
    },
    added_by: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    },
    reason: {
      type: String
    }
  },
  {
    timestamps: true,
  },
);

const attendanceModel = model('Attendance', attendanceSchema);
export default attendanceModel;