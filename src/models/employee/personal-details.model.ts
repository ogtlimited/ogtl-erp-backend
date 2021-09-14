/* eslint-disable prettier/prettier */
import { PersonalDetail } from "@/interfaces/employee-interface/personal-details.interface";
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';


const personalDetailsSchema: Schema = new Schema(
    {
        employee_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Employee",
            },
      passport_number: {
        type: String,
      },
        date_of_issue: {
            type: Date,
        },
        valid_upto: {
            type: Date,
        },
        place_of_issue: {
            type: String,
        },
        marital_status: {
            type: String,
            enum: ["single", "married", "divorced", "widowed"],
        },
        blood_group: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },
    },

    {
        timestamps: true
    }


    );

const PersonalDetailModel = model<PersonalDetail & Document>('PersonalDetails', personalDetailsSchema);

export default PersonalDetailModel;
