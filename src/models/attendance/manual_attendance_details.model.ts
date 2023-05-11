/* eslint-disable prettier/prettier */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import { model, Schema } from 'mongoose';

const ManualAttendanceDetailsSchema: Schema = new Schema(
    {
        ogid: {
            type: String,
            required: true,
        },
        attendance_id_from_external_db: {
            type: String,
            required: true,
        },
        departmentId: {
            type: Schema.Types.ObjectId,
            ref: "Department"
        },
        campaignId: {
            type: Schema.Types.ObjectId,
            ref: "Project"
        },
        ClockIn: {
            type: String
        },
        ClockOut: {
            type: String
        },
        reason: {
            type: String
        }
    },
    {
        timestamps: true,
    },
);

const manualAttendanceDetailsModel = model('manualAttendancedetails', ManualAttendanceDetailsSchema);
export default manualAttendanceDetailsModel;