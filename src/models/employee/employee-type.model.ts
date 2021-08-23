/* eslint-disable prettier/prettier */
import { EmployeeType } from '@/interfaces/employee-interface/employee-type.interface';
import { model, Schema, Document} from 'mongoose';
import mongoose from "mongoose";

const employeeTypeSchema : Schema = new Schema(
    {
        type: {
            type: String,
            required: true,
            unique: true,
          },
    },

    {
        timestamps: true,
    },

);

const userModel = model<EmployeeType & Document>('EmployeeType', employeeTypeSchema);

export default userModel;