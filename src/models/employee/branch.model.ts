/* eslint-disable prettier/prettier */
import {Branch} from '@interfaces/employee-interface/branch.interface';
import { model, Schema, Document } from 'mongoose';

const branchSchema: Schema = new Schema(
    {
        branch: {
            type: String,
            required: true,
            unique: true,
          },
         
    },
    {
        timestamps: true,
    },
);

const userModel = model<Branch & Document>('Branch', branchSchema);

export default userModel;