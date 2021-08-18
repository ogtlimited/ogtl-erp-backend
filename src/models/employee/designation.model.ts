import { Designation } from '@/interfaces/employee-interface/designation.interface';
import { model, Schema, Document} from 'mongoose';
import mongoose from "mongoose";

const designationSchema: Schema = new Schema(
    {
        designation: {
            type: String,
            required: true,
            unique: true,
          },
    },
    {
        timestamps: true,
      },
    );


const userModel = model<Designation & Document>('Designation', designationSchema);

export default userModel;