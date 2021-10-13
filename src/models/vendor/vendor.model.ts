import { model, Schema, Document } from 'mongoose';
import { IVendor } from '@interfaces/vendor-interface/vendor-interface';

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

const vendorModel = model<IVendor & Document>('Vendor', vendorSchema);

export default vendorModel;
