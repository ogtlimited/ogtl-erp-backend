/* eslint-disable prettier/prettier */
export interface IAttendance {
    startTime: Date;
    endTime: Date;
    employeeID: string | Object | Array<Object>;
    shift: string;
    status: string;
}
