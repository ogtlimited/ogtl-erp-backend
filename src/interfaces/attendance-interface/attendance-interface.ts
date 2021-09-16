/* eslint-disable prettier/prettier */
export interface IAttendance {
    startTime: String;
    endTime: String;
    employeeId: string | Object | Array<Object>;
    shiftTypeId: string;
    statusId: string;
}

export interface IAttendanceCreatedResponse {
    startTime: String;
    endTime: String;
    shiftTypeId: string;
    statusId: string;
}

export interface ICreateAttendance {
    ogId: string;
    shiftTypeId?: string;
    employeeId?: string;
    clockInTime: string;
    departmentId?: string;
    projectId?: string;
}
