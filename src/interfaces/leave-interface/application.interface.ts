/* eslint-disable prettier/prettier */
export interface ILeaveApplication{
    _id?: string;
    employee_id?: string;
    leave_type_id: string;
    from_date: Date;
    to_date : Date;
    leave_approver?: string;
    employee_project_id?: string;
    // posting_date: Date;
    reason: string;
    status?: string;
}
export interface ILeaveCount{
   ogid: string;
   leaveCount: number
}
