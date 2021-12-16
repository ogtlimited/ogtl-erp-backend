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
        account: {
            read: {
                type: Boolean
            },
            create: {
                type: Boolean
            },
            update: {
                type: Boolean
            },
            delete: {
                type: Boolean
            },
        },
        projects: {
            read: {
                type: Boolean
            },
            create: {
                type: Boolean
            },
            update: {
                type: Boolean
            },
            delete: {
                type: Boolean
            },
        },
        facility: {
            read: {
                type: Boolean
            },
            create: {
                type: Boolean
            },
            update: {
                type: Boolean
            },
            delete: {
                type: Boolean
            },
        },
        hr: {
            read: {
                type: Boolean
            },
            create: {
                type: Boolean
            },
            update: {
                type: Boolean
            },
            delete: {
                type: Boolean
            },
        },
        it: {
            read: {
                type: Boolean
            },
            create: {
                type: Boolean
            },
            update: {
                type: Boolean
            },
            delete: {
                type: Boolean
            },
        },
    }
);

const RoleModel = model<IRole & Document>('Role', roleSchema);

export default RoleModel;
