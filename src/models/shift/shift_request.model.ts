import { IShiftRequest } from '@interfaces/shift-interface/shift_request.interface';
import { model, Schema, Document } from 'mongoose';

const shiftRequestSchema: Schema = new Schema(
  {
    shift_type_id: {
      type: Schema.Types.ObjectId,
      ref: "ShiftType",
    },
    employee_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
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
)

const shiftRequestModel = model<IShiftRequest & Document>('ShiftRequest', shiftRequestSchema);

export default shiftRequestModel;
