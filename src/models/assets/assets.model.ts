/* eslint-disable prettier/prettier */
import {Assets} from '@interfaces/assets/assets.interface';
import { model, Schema, Document } from 'mongoose';

const AssetsSchema: Schema = new Schema(
    {
        assetName: {
            type: String,
            required: true,
            
          },
          assetId: {
            type: String,
            required: true,
            unique: true,
          },
          assigned_to: {
            type: String,
            required: true,
            
          },
          purchaseDate: {
            type: Date,
            required: true,
           
          },
          maufacturer: {
            type: String,
            required: true,
            
          },
          model: {
            type: String,
            required: true,
            
          },
          serialNumber: {
            type: String,
            required: true,
            unique: true,
          },
          supplier: {
            type: String,
            required: true,
            
          },
          condition: {
            type: String,
            required: true,

            
          },
          warranty: {
            type: String,
            required: true,
            enum : ["Fair", "Excellent", "Terrible"]
            
          },
          value: {
            type: String,
            required: true,
            
          },
          description: {
            type: String,
            required: true,
            
          },

    },
    {
        timestamps: true,
    },
);

const AssetsModel = model<Assets & Document>('Assets', AssetsSchema);

export default AssetsModel;
