/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */

import mongoose from 'mongoose';
import { model, Schema, Document } from 'mongoose';
import { ILeaveApprovalLevel } from '@/interfaces/leave-interface/leave_approval_level.interface';

const leaveApprovalLevelSchema : Schema = new Schema (
    {
        designation_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Designation",
            unique: true,
        },
        approval_level: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps:true
    },

);
const leaveApprovalLevelModel = model<Document & ILeaveApprovalLevel>('leaveApprovalLevel', leaveApprovalLevelSchema);
export default leaveApprovalLevelModel;
