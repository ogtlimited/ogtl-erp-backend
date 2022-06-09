/* eslint-disable prettier/prettier */
import {INotes} from '@interfaces/payroll/notes.interface'; 
import { model, Schema, Document } from 'mongoose';

const notesSchema: Schema = new Schema(
  {
    status:{
      type: String,
      enum: ["Pending","Seen by accounts","In progress","Completed"],
      default: "Pending"
    },
    title: {
      type: String,
      unique:true,
      required: true,
    },
    description: {
      type: String
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
  },
  {
    timestamps: true,
  },
);

const notesModel = model('Notes', notesSchema);
export default notesModel;
