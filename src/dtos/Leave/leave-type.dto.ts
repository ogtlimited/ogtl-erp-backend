/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsBoolean } from "class-validator";

export class CreateLeaveTypeDto{
    @IsNotEmpty()
    public leave_name : string;

    @IsNotEmpty()
    public max_leaves :  string;

    @IsNotEmpty()
    public applicable_after : string;

    @IsNotEmpty()
    public max_continous_days : string;

    @IsBoolean()
    public is_carry_forward : boolean;

    @IsBoolean()
    public is_without_pay: boolean;

    @IsBoolean()
    public is_optional: boolean;

    @IsBoolean()
    public allow_negative_balance : boolean;

    @IsBoolean()
    public include_holiday_leaves : boolean;

    @IsBoolean()
    public is_compensatory : boolean

}