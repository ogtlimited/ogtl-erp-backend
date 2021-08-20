/* eslint-disable prettier/prettier */
import { IsDate, IsBoolean } from 'class-validator';

export class CreateLeavePeriodDto{

    @IsDate()
    public from_date:  Date;

    @IsDate()
    public to_date:  Date;
    @IsBoolean()
    public is_active : Boolean;
}