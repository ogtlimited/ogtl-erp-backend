import { model, Schema } from 'mongoose';

const officeHolidaySchema: Schema = new Schema({
  public_holiday_id: {
    type: Schema.Types.ObjectId,
    ref: 'Public_holiday',
    required: true,
  },
  project_id: { 
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  department_id: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  }
});

const officeHolidayModel = model('office_holiday', officeHolidaySchema);
export default officeHolidayModel;
