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

const BranchModel = model<Branch & Document>('Branch', branchSchema);

export default BranchModel;
