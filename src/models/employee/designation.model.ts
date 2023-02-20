/* eslint-disable prettier/prettier */
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
        department_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Department",
        },
        campaign_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
        approval_level: {
          type: Number,
          required: true,
        },
        slug: {
          type: String,
          required: true,
          unique: true,
        },
        delete: {
          type: Boolean,
          default: false
      }
    },
    {
        timestamps: true,
      },
    );


const DesignationModel = model<Designation & Document>('Designation', designationSchema);

export default DesignationModel;
