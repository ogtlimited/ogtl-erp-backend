import { Application } from '@/interfaces/leave-interface/application.interface';
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
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "LeaveType",
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

const userModel = model<Application & Document>('Application', applicationSchema);

export default userModel;
