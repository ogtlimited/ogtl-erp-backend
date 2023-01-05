/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema, Document } from 'mongoose';

const LeaveTypeSchema : Schema = new Schema (
    {
        leave_type: {
            type: String,
            required: true
        },
        delete: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps:true
    }
);

const LeaveTypeModel = model('LeaveType', LeaveTypeSchema);
export default LeaveTypeModel;
