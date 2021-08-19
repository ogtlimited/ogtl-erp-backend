/* eslint-disable prettier/prettier */
import { TrainingAttendance } from '@interfaces/training/training-attendance.interface';
import { model, Schema, Document } from 'mongoose';

const TrainingAttendanceSchema: Schema = new Schema(
  {
    employee_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },
    training_event_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "TrainingEvent"
    },
    feedback: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  },
);

const TrainingAttendanceModel = model<TrainingAttendance & Document>('TrainingAttendance', TrainingAttendanceSchema);
export default TrainingAttendanceModel;