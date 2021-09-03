/* eslint-disable prettier/prettier */
import { WorkExperience } from "@/interfaces/employee-interface/work-experience.interface";
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';

const workExperienceSchema: Schema = new Schema(
    {
        employee_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Employee",
            },
        company: {
            type: String,
        },
        designation: {
            type: String,
        },
        salary: {
            type: String,
        },
        address: {
            type: String,
        },
    },

    {
        timestamps:true
    },

);

const SalaryDetailModel = model<WorkExperience & Document>('WorkExperience', workExperienceSchema);

export default SalaryDetailModel;
