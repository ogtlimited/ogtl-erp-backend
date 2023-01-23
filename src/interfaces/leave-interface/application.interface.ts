/* eslint-disable prettier/prettier */
export interface ILeaveApplication{
    _id?: string;
    employee_id?: string;
    project_id?: string;
    department_id?: string;
    leave_type_id: string;
    from_date: Date;
    to_date : Date;
    leave_approver?: string | null;
    approval_level?: number;
    reason_for_application?: string;
    status?: string;
    rejection_reason: string;
    hr_stage?: boolean;
    acted_on?: boolean;
    list_of_approvers?: string[];
    first_approver?: string | null;
}
export interface ILeaveCount{
   ogid: string;
   leaveCount: number
}
