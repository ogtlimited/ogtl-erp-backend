/* eslint-disable prettier/prettier */

import { ILeaveApplication } from '@/interfaces/leave-interface/application.interface';
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';

const applicationSchema : Schema = new Schema (
    {
        employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Employee",
           },

        leave_type_id:{
                type: String,
                enum:["Annual","Casual","Sick","Without Pay","Maternity"],
                required: true,
           },

        from_date:{
            type: Date,
            required: true,
        },

        to_date : {
            type: Date,
            required: true,
        },

        leave_approver: {
            type: String,
            required : true,
        },

        posting_date: {
            type: Date,
        },

        reason: {
            type: String,
        },

        status: {
            type: String,
            enum: ['open','approved','rejected','cancelled'],
            default : 'open',
        },


    },

    {
        timestamps:true
    },
    
);

const applicationModel = model<ILeaveApplication & Document>('LeaveApplication', applicationSchema);

export default applicationModel;
