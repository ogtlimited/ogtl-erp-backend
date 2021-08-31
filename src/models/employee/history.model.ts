/* eslint-disable prettier/prettier */
import { History } from '@/interfaces/employee-interface/history.interface';
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';

const historySchema: Schema = new Schema(
    {
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
        },
      branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
          default:null
      },
      
      designation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation",
          default:null
      },
      from_date: {
        type: Date,
      },
      to_date: {
        type: Date,
      },


    },

    {
        timestamps: true
    },
);

const HistoryModel = model<History & Document>('History', historySchema);

export default HistoryModel;
