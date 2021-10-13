import { model, Schema, Document } from 'mongoose';
import { IBills } from '@interfaces/vendor-interface/bills-interface';

const billsSchema: Schema = new Schema({
  number: {
    type: String,
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Vendor',
  },
  billDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const billsModel = model<IBills & Document>('Bills', billsSchema);

export default billsModel;
