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

<<<<<<< HEAD
const historyModel = model<History & Document>('History', historySchema);

export default historyModel;
=======
const HistoryModel = model<History & Document>('History', historySchema);

export default HistoryModel;
>>>>>>> 7d0a7e851283e71750b9b4dfc555456f7ebdd86b
