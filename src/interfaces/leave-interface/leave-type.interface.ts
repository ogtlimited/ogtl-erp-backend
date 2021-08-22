/* eslint-disable prettier/prettier */
export interface ILeaveType{
    _id: string;
    leave_name : string;
    max_leaves :  string;
    applicable_after : string;
    max_continous_days : string;
    is_carry_forward : boolean;
    is_without_pay: boolean;
    is_optional: boolean;
    allow_negative_balance : boolean;
    include_holiday_leaves : boolean;
    is_compensatory : boolean

}