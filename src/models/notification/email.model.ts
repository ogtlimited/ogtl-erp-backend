/* eslint-disable prettier/prettier */
import { IEmail } from '@interfaces/notification/email.interface';
import mongoose, { model, Schema, Document} from 'mongoose';

const emailSchema: Schema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    model_name: {
        type: String,
        default: null
    },
    email_id: {
        type: String,
        required: true
    },
    is_read: {
        type: Boolean,
        default: false
    },
    subject: {
        type: String,
        default: null
    },
    sender: {
        type: String,
        default: null
    },
  },
  {
    timestamps: true,
  },
);


const Email = model<IEmail & Document>('Email', emailSchema);

export default Email;

