/* eslint-disable prettier/prettier */
import NotificationHelper from '@/utils/helper/notification.helper';
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

promotionSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
promotionSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
promotionSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const promotionModel = model<IPromotion & Document>('Promotion', promotionSchema);
export default promotionModel;