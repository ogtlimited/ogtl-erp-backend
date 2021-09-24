/* eslint-disable prettier/prettier */
import {assetAssignment} from '@/interfaces/assets/asset-assignment.interface';
import { model, Schema, Document } from 'mongoose';

const AssetAssignmentSchema: Schema = new Schema(
    {
        assetName: {
            type: String,
            required: true,

          },
          assetId: {
            type: String,
            required: true,

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

const AssetAssignmentModel = model<assetAssignment & Document>('AssetsAssignment', AssetAssignmentSchema);

export default AssetAssignmentModel;
