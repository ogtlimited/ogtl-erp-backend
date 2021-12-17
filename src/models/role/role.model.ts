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
                type: Boolean,
                 default: false
            },
            create: {
                type: Boolean,
                 default: false
            },
            update: {
                type: Boolean,
                 default: false
            },
            delete: {
                type: Boolean,
                 default: false
            },
        },
        projects: {
            read: {
                type: Boolean,
                 default: false
            },
            create: {
                type: Boolean,
                 default: false
            },
            update: {
                type: Boolean,
                 default: false
            },
            delete: {
                type: Boolean,
                 default: false
            },
        },
        facility: {
            read: {
                type: Boolean,
                 default: false
            },
            create: {
                type: Boolean,
                 default: false
            },
            update: {
                type: Boolean,
                 default: false
            },
            delete: {
                type: Boolean,
                 default: false
            },
        },
        hr: {
            read: {
                type: Boolean,
                 default: false
            },
            create: {
                type: Boolean,
                 default: false
            },
            update: {
                type: Boolean,
                 default: false
            },
            delete: {
                type: Boolean,
                 default: false
            },
        },
        it: {
            read: {
                type: Boolean,
                 default: false
            },
            create: {
                type: Boolean,
                 default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            },
        },
    }
);

const RoleModel = model<IRole & Document>('Role', roleSchema);

export default RoleModel;
