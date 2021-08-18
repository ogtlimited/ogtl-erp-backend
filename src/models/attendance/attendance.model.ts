/* eslint-disable prettier/prettier */
import { Attendance } from '@interfaces/attendance-interface/attendance-interface';
import { model, Schema, Document } from 'mongoose';

const attendanceSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    shift: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shift"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    startTime: {
      type: Date
    },
    end_name: {
      type: Date
    }
  },
  {
    timestamps: true,
  },
);

const attendanceModel = model<Attendance & Document>('Attendance', attendanceSchema);
export default attendanceModel;