/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ManualAttendanceDto {
    @IsString()
    public clockInTime: string;

    @IsOptional()
    @IsString()
    public clockOutTime: string;

    @IsString()
    @IsOptional()
    public departmentId: string;

    @IsString()
    @IsNotEmpty()
    public attendance_id: string;

    @IsString()
    @IsOptional()
    public campaignId: string;

    @IsString()
    @IsOptional()
    public reason: string;
}
