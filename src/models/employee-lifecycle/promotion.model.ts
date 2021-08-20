/* eslint-disable prettier/prettier */
import { Promotion } from '@interfaces/employee-lifecycle/promotion.interface';
import { model, Schema, Document } from 'mongoose';

const promotionSchema: Schema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee"
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Status"
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department"
    },
    promotionDetails: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PromotionDetails"
    },
    branch:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Branch"
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

const promotionModel = model<Promotion & Document>('Promotion', promotionSchema);
export default promotionModel;