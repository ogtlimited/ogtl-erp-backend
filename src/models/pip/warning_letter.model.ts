/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import { IWarningLetter } from '@interfaces/pip-interface/warning_letter.interface';

const warningLetterSchema: Schema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    reason: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true
    },
    actions: {
      type: String,
      required: true
    },
    date_issued: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

const warningLetterModel = model<IWarningLetter & Document>('WarningLetter',warningLetterSchema);
export default warningLetterModel;
