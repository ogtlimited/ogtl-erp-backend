/* eslint-disable prettier/prettier */
// noinspection JSUnusedAssignment

import { HttpException } from '@exceptions/HttpException';
import manualAttendanceModel from '@/models/attendance/manual_attendance.model';
import { IManualAttendance } from '@/interfaces/attendance-interface/manual_attendance.interface';
import { ManualAttendanceDto } from '@/dtos/attendance/manual_attendance.dto';




class ManualAttendanceService {
    private manualAttendanceModel = manualAttendanceModel;

    public async createManualAttendanceDetails(query: ManualAttendanceDto): Promise<IManualAttendance> {
        const manualAttendance = await this.manualAttendanceModel.create(query)
        return manualAttendance
    }
}
export default ManualAttendanceService;

