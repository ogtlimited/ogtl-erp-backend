export interface IManualAttendanceDetails {
    ogid?: string;
    attendance_id_from_external_db: string;
    ClockIn?: string;
    ClockOut?: String;
    departmentId?: string;
    campaignId?: string;
    reason: string
}
