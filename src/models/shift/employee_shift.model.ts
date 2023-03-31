/* eslint-disable prettier/prettier */
import { IEmployeeShift } from '@/interfaces/shift-interface/employee_shift.interface';
import { model, Schema, Document } from 'mongoose';

const employeeShiftsSchema: Schema = new Schema(
    {
        start: {
            type: String,
            default: null,
        },
        ogid: {
            type: String,
            required: true,
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
        departmentID: {
            type: Schema.Types.ObjectId,
            ref: 'Department',
            default: null,
        },
        expectedWorkTime: {
            type: String,
            default: null,
        },
        day: {
            type: String,
            enum: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"]
        },
        off: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    },
)

const employeeShiftsModel = model<IEmployeeShift & Document>('employeeshift', employeeShiftsSchema);
export default employeeShiftsModel;
