/* eslint-disable prettier/prettier */
import NotificationHelper from '@/utils/helper/notification.helper';
import { IShiftAssignment } from '@interfaces/shift-interface/shift_assignment.interface';
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

shiftAssignmentSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
shiftAssignmentSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
shiftAssignmentSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const shiftAssignmentModel = model<IShiftAssignment & Document>('ShiftAssignment', shiftAssignmentSchema);

export default shiftAssignmentModel;
