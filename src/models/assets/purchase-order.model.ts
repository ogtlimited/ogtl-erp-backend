/* eslint-disable prettier/prettier */
import { purchaseOrder } from "@/interfaces/assets/purchase-order.interface";
import NotificationHelper from "@/utils/helper/notification.helper";
import { model, Schema, Document } from 'mongoose';

const PurchaseOrderSchema : Schema = new Schema(
    {
        productName: {
            type: String,
            required: true,

          },
          purchaseOrderId : 
           {
            type: String,
            required: true,

          },

          departmentId: {
            type: Schema.Types.ObjectId,
             ref: "Department",
          
          },

          projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
          
          },

          location: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Branch",
          
          },
          model: {
            type: String,
            required: true,

          },
          manufacturer: {
            type: String,
            required: true,

          },
          amount: {
            type: String,
            required: true,

          },
          status: {
            type: String,
            enum: ["Draft","Approved by Accountant","Approved By COO","Approved By CEO","Rejected"],
            default: "Draft"

          },


   },
   {
    timestamps: true,
},

);

PurchaseOrderSchema.post('save', function(doc) {
  
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
PurchaseOrderSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
PurchaseOrderSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const PurchaseOrderModel = model<purchaseOrder & Document>('PurchaseOrder', PurchaseOrderSchema);

export default PurchaseOrderModel;