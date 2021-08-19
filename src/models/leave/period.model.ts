/* eslint-disable prettier/prettier */
import { Period } from '@/interfaces/leave-interface/period.interface';
import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';

const periodSchema : Schema = new Schema (
    {
        from_date:{
            type: Date,
            required: true,
        
        },

        to_date : {
            type: Date,
            required: true,
        },

        is_active :{
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps:true
    },
    
);

const userModel = model<Period & Document>('period', periodSchema);

export default userModel;