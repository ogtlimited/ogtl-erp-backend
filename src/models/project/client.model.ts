/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { IClient } from '@interfaces/project-interface/client.interface';
import { sendEmail } from '@utils/sendEmail';

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
    address:{
      type:String
    },
    contact_phone:{
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    code:{
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
      type: String,
        required: true
    },
    company: {
      type: String,
      required: true
    },
    deactivated: {
      type: Boolean,
      default: false
    },

  },
  {
    timestamps: true,
  }
);

clientSchema.post('save', function(doc) {
  // sendEmail("New Client Account", "You client account has been created",[doc.email])
});

//Use a pre method to add , to range when you want to retrieve data
const clientModel = model<IClient & Document>("Client", clientSchema);

export default clientModel;
