import { model, Schema } from 'mongoose';

const officeHolidaySchema: Schema = new Schema({
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },

  department_id: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },

  public_holiday_id: {
    type: Schema.Types.ObjectId,
    ref: 'Public_holiday',
  },
});

const officeHolidayModel = model('office_holiday', officeHolidaySchema);
export default officeHolidayModel;
