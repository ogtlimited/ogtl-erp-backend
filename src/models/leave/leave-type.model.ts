/* eslint-disable prettier/prettier */

import { ILeaveType } from '@/interfaces/leave-interface/leave-type.interface';
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';

const leaveTypeSchema : Schema = new Schema (
    {
        leave_name : {
            type: String,
            required: true,
        },

        max_leaves : {
            type: String,
            required: true
        },

        applicable_after :{
            type: String,
        },

        max_continous_days : {
            type : String,
        },

        is_carry_forward :{
            type: Boolean,
            default: false,
        },

        is_without_pay: {
            type: Boolean,
            default: false,
        },

        is_optional: {
            type: Boolean,
            default: false,
        },

        allow_negative_balance : {
            type: Boolean,
            default: false,
        },

        include_holiday_leaves : {
            type: Boolean,
            default: false,
        },

        is_compensatory : {
            type: Boolean,
            default: false,
        },


    },

    {
        timestamps:true
    },
    
);

const leaveTypeModel = model<ILeaveType & Document>('LeaveType', leaveTypeSchema);

export default leaveTypeModel;