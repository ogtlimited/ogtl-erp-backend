/* eslint-disable prettier/prettier */
import { IShift } from '@interfaces/shift-interface/shift.interface';
import { model, Schema, Document } from 'mongoose';

const shiftsSchema: Schema = new Schema(
    {
        start: {
            type: String,
            default: null,
        },
        end: {
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
            enum: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"]
        }
    },
    {
        timestamps: true,
    },
)

const shiftModel = model<IShift & Document>('Shift', shiftsSchema);
export default shiftModel;
