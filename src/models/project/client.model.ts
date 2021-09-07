import { model, Schema, Document } from 'mongoose';
import { IClient } from '@interfaces/project-interface/client.interface';

const clientSchema :Schema = new Schema(
  {
    client_name: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required: true,
      unique: true
    },
    address:[{
      type:String
    }],
    contact_phone:[{
      type: String,
      required: true
    }],

  },
  {
    timestamps: true,
  }
);

//Use a pre method to add , to range when you want to retrieve data
const clientModel = model<IClient & Document>("Client", clientSchema);

export default clientModel;
