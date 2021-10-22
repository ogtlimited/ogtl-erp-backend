/* eslint-disable prettier/prettier */
import { IInvoice } from './../../interfaces/invoice/invoice.interface';
import { Document, model, Schema } from 'mongoose';


const invoiceSchema: Schema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    ref: {
      type: String,
    },
    invoice_date: {
      type: Date,
      default: new Date(),
    },
    total_amount: {
      type: Number,
      required: true,
    },
    paid: {
      default: 0,
      type: Number,
      required: false,
    },
    balance: {
      type: Number,
      required: false,
    },
    due_date: {
      type: Date,
      required: true,
    },
    productItems:[{
      type: Schema.Types.ObjectId,
      ref: "ProductService",
    }],
    type: {
      type: String,
      required: true,
      enum : ["Invoice", "Bill"]
    },
    status: {
      type: String,
      default: 'Draft',
      required: true,
      enum: ['Published', 'Draft']
    }
  }
);

const invoiceModel = model<IInvoice & Document>('Invoice', invoiceSchema);
export default invoiceModel;