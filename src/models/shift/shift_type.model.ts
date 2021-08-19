/* eslint-disable prettier/prettier */
import { ShiftType } from '@interfaces/shift-interface/shift_type.interface';
import { model, Schema, Document } from 'mongoose';

const shiftTypeSchema: Schema = new Schema(
  {
    shift_name: {
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
  },
  {
    timestamps: true,
  },
)

const shiftTypeModel = model<ShiftType & Document>('ShiftType', shiftTypeSchema);

export default shiftTypeModel;
