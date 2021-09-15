/* eslint-disable prettier/prettier */
import { IPromotion } from '@interfaces/employee-lifecycle/promotion.interface';
import { model, Schema, Document } from 'mongoose';

const promotionSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    
    newDesignation: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Designation"
    },
    promotionDate: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true,
  },
);

const promotionModel = model<IPromotion & Document>('Promotion', promotionSchema);
export default promotionModel;