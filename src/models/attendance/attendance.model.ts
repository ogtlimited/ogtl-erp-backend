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
      type: Date
    },
    clockOutTime: {
      type: Date
    },
    hoursWorked:{
      type: Number,
      default: 0
    },
    minutesWorked:{
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  },
);

const attendanceModel = model('Attendance', attendanceSchema);
export default attendanceModel;