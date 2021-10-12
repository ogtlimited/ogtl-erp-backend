/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import { IProductService } from './../../interfaces/Products/products.interface';

const productServiceSchema: Schema = new Schema(
  {
    product: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rate: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      required: true,
    },
    units: {
      type: String,
      required: true,
    },
    tax: {
      type: String,
      required: true,
    },
  }
);

const productServiceModel = model<IProductService & Document>('ProductService', productServiceSchema);
export default productServiceModel;
