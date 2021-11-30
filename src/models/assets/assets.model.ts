/* eslint-disable prettier/prettier */
import { Asset } from "@/interfaces/assets/assets.interface";
import { model, Schema, Document } from 'mongoose';

const AssetSchema : Schema = new Schema({
    assetId: {
        type: String,
        required : true,
      
      },
 

      assetName: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "PurchaseOrder",
      
      },
     
    serialNumber: {
        type: String,
        

      },


    assetType :{
        type : String,
        required : true,
        enum : ["Facility", "IT"]
    }




},  {
    timestamps: true,
},
);

const AssetModel = model<Asset & Document>('Asset', AssetSchema);

export default AssetModel;