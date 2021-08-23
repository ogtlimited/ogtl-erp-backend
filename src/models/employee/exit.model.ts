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
        },
        relieving_date: {
          type: Date,
        },
        reason_for_leaving: {
          type: String,
        },
        leave_encashed: {
          type: String,
          enum: ["yes", "no"],
        },
        encashment_date: {
          type: Date,
        },
        reason_for_resignation: {
          type: String,
          enum: ["better_prospects", "health_concern"],
        },
        new_work_place: {
          type: String,
        },
        feedback: {
          type: String,
        },
    },

    {
        timestamps: true,
    },

);

const userModel = model<Exit & Document>('Exit', exitSchema);

export default userModel;