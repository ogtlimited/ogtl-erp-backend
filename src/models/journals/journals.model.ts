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
      type: String,
      default: null,
    },
    credit: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: Date,
      default: 'Draft',
      required: true,
      enum: ['Publish', 'Draft']
    }
  }
);

const journalModel = model<IJournal & Document>('Journal', journalSchema);
export default journalModel;
