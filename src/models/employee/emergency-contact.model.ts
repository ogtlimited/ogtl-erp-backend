/* eslint-disable prettier/prettier */
import { EmergencyContact } from '@/interfaces/employee-interface/emergency-contact.interface';
import { model, Schema, Document} from 'mongoose';
import mongoose from "mongoose";

const emergencyContactSchema: Schema = new Schema(
    {
      employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
        },
      emergency_phone: {
        type: String,
        required: true,
      },
      emergency_contact_name: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },

    },
    {
        timestamps: true,
    },
);

const EmergencyContactModel = model<EmergencyContact & Document>('EmergencyContact', emergencyContactSchema);

export default EmergencyContactModel;
