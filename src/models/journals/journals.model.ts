/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import { IJournal } from './../../interfaces/journal/journal.interface';

const journalSchema: Schema = new Schema(
  {
    account: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Account"
    },
    ref: {
      type: String,
    },
    description: {
      type: String,
    },
    debit: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    }
  }
);

const journalModel = model<IJournal & Document>('Journal', journalSchema);
export default journalModel;
