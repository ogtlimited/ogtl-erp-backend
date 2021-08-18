/* eslint-disable prettier/prettier */
export interface Attendance {
    _id: string;
    startTime: Date;
    endTime: Date;
    employeeID: string;
    shift: string;
    status: string;
}
