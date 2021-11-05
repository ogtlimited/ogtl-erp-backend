/* eslint-disable prettier/prettier */
import { Exit } from "@/interfaces/employee-interface/exit.interface";
import { model, Schema, Document }  from 'mongoose';
import mongoose from 'mongoose';

const exitSchema: Schema = new Schema(
    {
        employee_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Employee",
          },
        resignation_letter_date: {
          type: Date,
          required:true,
        },
        relieving_date: {
          type: Date,
          required:true,
        },
        reason_for_resignation: {
          type: String,
          required:true,

        },

    },

    {
        timestamps: true,
    },

);

const ExitModel = model<Exit & Document>('Exit', exitSchema);

export default ExitModel;
