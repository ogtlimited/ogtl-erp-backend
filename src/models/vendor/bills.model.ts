import { model, Schema, Document } from 'mongoose';
import { IBills } from '@interfaces/vendor-interface/bills-interface';

const billsSchema: Schema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  ref: {
    type: String,
  },
  bill_date: {
    type: Date,
    default: new Date(),
  },
  total_amount: {
    type: Number,
    required: true,
  },
  paid: {
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
  productItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProductService',
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ['Draft', 'Published'],
    default: 'Draft',
  },
});

const billsModel = model<IBills & Document>('Bills', billsSchema);

export default billsModel;
