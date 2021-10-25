/* eslint-disable prettier/prettier */
import { IPayment } from '../../interfaces/payments/payment-interface';
import { model, Schema, Document } from 'mongoose';


const PaymentSchema: Schema = new Schema({
  number: {
    type: String,
    required: true,
  },
  bill: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Bills',
  },
  invoice: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Invoice',
  },
  date: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  journal: {
    type: Schema.Types.ObjectId,
    ref: 'Journal',
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Paid', 'Not Paid', 'Half Paid'],
  },
});

const paymentModel = model<IPayment & Document>('Payment', PaymentSchema);

export default paymentModel;
