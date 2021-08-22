/* eslint-disable prettier/prettier */

import { ILeavePolicy } from '@/interfaces/leave-interface/policy.interface';
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';


const policySchema : Schema = new Schema (
    {
        leave_type_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "LeaveType",
       },

       annual_allocation:{
           type: String,
           required: true,
       },
    },

    {
        timestamps:true
    },
    
);

const LeavePolicyModel = model<ILeavePolicy & Document>('Policy', policySchema);

export default LeavePolicyModel;