// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import { model, Schema } from 'mongoose';

const publicHolidaySchema: Schema = new Schema({
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deleted_by: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
});

const publicHolidayModel = model('public_holiday', publicHolidaySchema);
export default publicHolidayModel;
