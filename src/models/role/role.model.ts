/* eslint-disable prettier/prettier */
import {IRole} from '@interfaces/role/role.interface';
import { model, Schema, Document } from 'mongoose';

const roleSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true,
    },
);

const RoleModel = model<IRole & Document>('Role', roleSchema);

export default RoleModel;
