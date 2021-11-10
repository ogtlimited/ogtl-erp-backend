import NotificationHelper from '@/utils/helper/notification.helper';
import { IShiftRequest } from '@interfaces/shift-interface/shift_request.interface';
import { model, Schema, Document } from 'mongoose';

const shiftRequestSchema: Schema = new Schema(
  {
    shift_type_id: {
      type: Schema.Types.ObjectId,
      ref: 'ShiftType',
    },
    employee_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    from_date: {
      type: Date,
      default: null,
    },

    to_date: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

shiftRequestSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
shiftRequestSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
shiftRequestSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});

const shiftRequestModel = model<IShiftRequest & Document>('ShiftRequest', shiftRequestSchema);

export default shiftRequestModel;
