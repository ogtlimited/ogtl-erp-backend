import { Allocation } from '@/interfaces/leave-interface/allocation.interface';
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';

const allocationSchema : Schema = new Schema (
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

        new_leaves_allocation:{
            type: String,
        },

        add_unused_leaves: {
            type: Boolean,
            default : true
        },
    },

    {
        timestamps:true
    },
    
);

const userModel = model<Allocation & Document>('Allocation', allocationSchema);

export default userModel;