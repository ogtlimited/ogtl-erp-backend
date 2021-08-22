/* eslint-disable prettier/prettier */
export interface ILeaveAllocation{
    _id: string;
    employee_id: string;
    from_date: Date;
    to_date : Date;
    new_leaves_allocation: string;
    add_unused_leaves: Boolean;
}