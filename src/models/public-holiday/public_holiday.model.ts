/* eslint-disable prettier/prettier .... */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import { model, Schema } from 'mongoose';

const publicHolidaySchema: Schema = new Schema(
  {
    startDate: {
      type:Date,
      required: true,
    },
    endDate: {
      type:Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      required:true,
      default:false,
    },
    deleted_by: {
      type: String,
      ref: "Employee"
    },
    updated_by: {
      type: String,
      ref:"Employee"
    },
    created_by: {
      type: Date,
      ref:"employee_id"
    },
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "project_id"
    },
   
  },
);

const publicHolidayModel = model('public_holiday', publicHolidaySchema);
export default publicHolidayModel;