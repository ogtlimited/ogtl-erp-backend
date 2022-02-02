/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { IBills } from '@interfaces/vendor-interface/bills-interface';
import NotificationHelper from '@utils/helper/notification.helper';

const billsSchema: Schema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  ref: {
    type: String,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true
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
    default: 0,
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
billsSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
billsSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
billsSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const billsModel = model<IBills & Document>('Bills', billsSchema);

export default billsModel;
