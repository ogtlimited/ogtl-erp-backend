/* eslint-disable prettier/prettier */

import { IsString, IsDate, IsBoolean, IsNotEmpty } from 'class-validator';
export class Allocation{
    @IsNotEmpty()
    @IsString()
    public employee_id: string;

    @IsNotEmpty()
    @IsDate()
    public from_date: Date;

    @IsNotEmpty()
    @IsDate()
    public to_date : Date;

    @IsString()
    public new_leaves_allocation: string;

    @IsBoolean()
    public add_unused_leaves: Boolean;
}