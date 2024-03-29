/* eslint-disable prettier/prettier */
import { IShiftType } from '@interfaces/shift-interface/shift_type.interface';
import { model, Schema, Document } from 'mongoose';
import NotificationHelper from '@utils/helper/notification.helper';

const shiftTypeSchema: Schema = new Schema(
  {
    shift_name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    start_time: {
      type: String,
      default: null,
    },
    end_time: {
      type: String,
      default: null,
    },
    expectedWorkTime: {
      type: String,
      default: null,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      default: null,
    },
  },
  {
    timestamps: true,
  },
)
shiftTypeSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
shiftTypeSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
shiftTypeSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const shiftTypeModel = model<IShiftType & Document>('ShiftType', shiftTypeSchema);

export default shiftTypeModel;
