/* eslint-disable prettier/prettier */
import { purchaseOrder } from "@/interfaces/assets/purchase-order.interface";
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
          amount: {
            type: String,
            required: true,

          },
          status: {
            type: String,
            required: true,

          },


   },
   {
    timestamps: true,
},

);
const PurchaseOrderModel = model<purchaseOrder & Document>('PurchaseOrder', PurchaseOrderSchema);

export default PurchaseOrderModel;