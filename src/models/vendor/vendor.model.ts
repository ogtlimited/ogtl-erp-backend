import { model, Schema, Document } from 'mongoose';
import { IVendor } from '@interfaces/vendor-interface/vendor-interface';
import NotificationHelper from '@utils/helper/notification.helper';

const vendorSchema: Schema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  stateRegion: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
vendorSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
vendorSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
vendorSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const vendorModel = model<IVendor & Document>('Vendor', vendorSchema);

export default vendorModel;
