/* eslint-disable prettier/prettier */
import { ILeaveSettings } from "@/interfaces/leave-interface/leave-settings.interface";
import { Schema, model,Document } from "mongoose";




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

const LeavesettingModel = model<ILeaveSettings & Document>('LeaveSettings', settingsSchema);

export default LeavesettingModel;
