/* eslint-disable prettier/prettier */
import { ITermination } from '@interfaces/employee-lifecycle/termination.interface';
import { model, Schema, Document } from 'mongoose';

const terminationSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    
    reason: {
      type: String,
      required: true,
    },
    terminationDate: {
        type: Date,
        required: true,
      },

    terminationType: {
      type: String,
      required: true,
      enum:["misconduct","others"]
    },
  },
  {
    timestamps: true,
  },
);

const terminationModel = model<ITermination & Document>('Termination', terminationSchema);
export default terminationModel;