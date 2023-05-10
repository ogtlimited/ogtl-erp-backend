/* eslint-disable prettier/prettier */
// noinspection JSUnusedAssignment

import { HttpException } from '@exceptions/HttpException';
import manualAttendanceDetails from '@/models/attendance/manual_attendance_details.model';
import { IManualAttendanceDetails } from '@/interfaces/attendance-interface/manual_attendance_details.interface';
import { ManualAttendanceDetailsDto } from '@/dtos/attendance/manual_attendance_details.dto';




class ManualAttendanceDetailsService {
    private manualAttendanceDetails = manualAttendanceDetails;

    public async createManualAttendanceDetails(query: ManualAttendanceDetailsDto): Promise<IManualAttendanceDetails> {
        const manualAttendanceDetails = await this.manualAttendanceDetails.create(query)
        return manualAttendanceDetails
    }
}
export default ManualAttendanceDetailsService;

