/* eslint-disable prettier/prettier */

import { ILeaveSettings } from '@/interfaces/leave-interface/settings.interface';
import { model, Schema, Document } from 'mongoose';

const settingsSchema : Schema = new Schema (
    {
       
        unused_leaves:{
                type: Number,
                required: true,
                default : 20
                
           },

        carryover:{
            type: Number,
            required: true,
            default : 0
        
        }

    },

    {
        timestamps:true
    },
    
);

const settingModel = model<ILeaveSettings & Document>('LeaveSettings', settingsSchema);

export default settingModel;
