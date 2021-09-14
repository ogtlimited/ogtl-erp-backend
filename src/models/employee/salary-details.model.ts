/* eslint-disable prettier/prettier */
import { SalaryDetail } from "@/interfaces/employee-interface/salary-details.interface";
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';

const salaryDetailsSchema: Schema = new Schema(
    {
        employee_id: {
             type: mongoose.Schema.Types.ObjectId,
             required: true,
             ref: "Employee",
            },
        salary_mode: {
            type: String,
            enum: ["bank", "cash", "cheque"],
        },
        bank_name: {
            type: String,
        },
        bank_code: {
            type: String,
        },
        bank_account_number: {
            type: String,
        },

    },

    {
        timestamps: true
    }
);

const SalaryDetailModel = model<SalaryDetail & Document>('SalaryDetails', salaryDetailsSchema);

export default SalaryDetailModel;
