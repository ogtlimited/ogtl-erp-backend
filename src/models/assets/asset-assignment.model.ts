/* eslint-disable prettier/prettier */
import {assetAssignment} from '@/interfaces/assets/asset-assignment.interface';
import NotificationHelper from '@/utils/helper/notification.helper';
import { model, Schema, Document } from 'mongoose';

const AssetAssignmentSchema: Schema = new Schema(
    {
        
          assetId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref : "Asset"

          },
          assigned_to: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employee",

          },
          assigned_by: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Employee",

          },
          
          condition: {
            type: String,
            required: true,
            enum : ["Fair", "Excellent", "Terrible"]


          },
          warranty: {
            type: String,
            required: true,
            enum : ["6 Months","1 year","More than 1 year"]


          },
          
          description: {
            type: String,


          },

    },
    {
        timestamps: true,
    },
);

AssetAssignmentSchema.post('save', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "SAVE").exec()
});
AssetAssignmentSchema.post('update', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "UPDATE").exec()
});
AssetAssignmentSchema.post('delete', function(doc) {
  const self: any = this;
  console.log(self.constructor.modelName)
  new NotificationHelper(self.constructor.modelName, "DELETE").exec()
});
const AssetAssignmentModel = model<assetAssignment & Document>('AssetsAssignment', AssetAssignmentSchema);

export default AssetAssignmentModel;
