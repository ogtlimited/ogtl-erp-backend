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
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
  }
);

const productServiceModel = model<IProductService & Document>('ProductService', productServiceSchema);
export default productServiceModel;
