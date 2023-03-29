/* eslint-disable prettier/prettier */
import { IShift } from '@interfaces/shift-interface/shift.interface';
import { model, Schema, Document } from 'mongoose';

const shiftsSchema: Schema = new Schema(
    {
        start_time: {
            type: String,
            default: null,
        },
        end_time: {
            type: String,
            default: null,
        },
        campaignID: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            default: null,
        },
        day_of_week: {
            type: String,
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        }
    },
    {
        timestamps: true,
    },
)

const shiftModel = model<IShift & Document>('Shift', shiftsSchema);
export default shiftModel;
