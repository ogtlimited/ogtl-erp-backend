/* eslint-disable prettier/prettier */
import { ContactDetail} from "@/interfaces/employee-interface/contact-details.interface";
import { model, Schema, Document} from 'mongoose';
import mongoose from "mongoose";

const contactDetailsSchema: Schema = new Schema (
    {
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
              required: true,
            ref: "Employee",
          },
      mobile: {
        type: String,
        required: true,
      },

          personal_email: {
            type: String,
            required: true,
            unique: true,
          },
          permanent_address_is: {
            type: String,
            enum: ["rented", "owned"],

          },
          permanent_address: {
            type: String,
          },
          current_address_is: {
            type: String,
            enum: ["rented", "owned"],

          },
          current_address: {
            type: String,
          },


    },
    {
        timestamps: true,
      },
    );

    const ContactDetailModel = model<ContactDetail & Document>('ContactDetails',contactDetailsSchema );

    export default ContactDetailModel;
