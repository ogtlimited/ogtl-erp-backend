export interface IManualAttendance {
    ogId?: string;
    attendance_id_from_external_db: string;
    clockInTime?: string;
    clockOutTime?: String;
    departmentId?: string;
    campaignId?: string;
    reason?: string
}
