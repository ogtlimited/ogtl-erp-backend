import { model, Schema, Document } from 'mongoose';
import { IVendorPayment } from '@interfaces/vendor-interface/payment-interface';

const vendorPaymentSchema: Schema = new Schema({
  number: {
    type: String,
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Vendor',
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
    required: true,
    ref: 'Journal',
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const vendorPaymentModel = model<IVendorPayment & Document>('VendorPayment', vendorPaymentSchema);

export default vendorPaymentModel;
