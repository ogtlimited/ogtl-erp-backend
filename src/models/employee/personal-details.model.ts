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
      means_of_identification: {
        type: String,
        default: null,
        enum: ["NIN","International Passport","Drivers License","Voters Card","Student ID","National Youth Service", null]
      },
      id_number:{
        type: String
      },
        date_of_issue: {
            default: null,
            type: Date,
        },
        valid_upto: {
            default: null,
            type: Date,
        },
        place_of_issue: {
            type: String,
        },
        marital_status: {
            type: String,
            default: null,
            enum: ["single", "married", "divorced", "widowed", null],
        },
        blood_group: {
            type: String,
            default: null,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", null],
        },
    },

    {
        timestamps: true
    }


    );

const PersonalDetailModel = model<PersonalDetail & Document>('PersonalDetails', personalDetailsSchema);

export default PersonalDetailModel;
