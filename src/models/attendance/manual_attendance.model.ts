/* eslint-disable prettier/prettier */
// import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import { model, Schema } from 'mongoose';

const ManualAttendanceSchema: Schema = new Schema(
    {
        ogId: {
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
        clockInTime: {
            type: String
        },
        clockOutTime: {
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

const manualAttendanceModel = model('manualAttendancedetails', ManualAttendanceSchema);
export default manualAttendanceModel;