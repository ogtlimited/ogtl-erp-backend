/* eslint-disable prettier/prettier */
import { IPayRoll } from '@/interfaces/payroll/payroll.interface';
import { model, Schema, Document } from 'mongoose';

/*
 Reconsider having an array field: employees

*/
const payRollSchema: Schema = new Schema(
  {
    totalAmount: {
      type: Number,
    },
    approved: {
      type: Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  },
);

const payRollModel = model<IPayRoll & Document>('PayRoll', payRollSchema);
export default payRollModel;
