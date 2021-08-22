/* eslint-disable prettier/prettier */
import { ILeavePeriod } from '@/interfaces/leave-interface/period.interface';

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

const LeavePeriodModel = model<ILeavePeriod & Document>('LeavePeriod', periodSchema);

export default LeavePeriodModel;