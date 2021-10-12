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
      default: null,
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
      type: Date,
      required: true,
      enum : ["Customer Invoice", "Vendor Bill"]
    }
  }
);

const invoiceModel = model<IInvoice & Document>('Invoice', invoiceSchema);
export default invoiceModel;