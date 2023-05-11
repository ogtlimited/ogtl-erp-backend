/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ManualAttendanceDetailsDto {
    @IsString()
    @IsNotEmpty()
    public ogid: string;
    
    @IsString()
    public attendance_id_from_external_db: string;

    @IsString()
    @IsNotEmpty()
    public ClockIn: string;

    @IsString()
    @IsNotEmpty()
    public ClockOut: string;
    
    @IsString()
    public departmentId: string;
    
    @IsString()
    public campaignId: string;

    @IsString()
    @IsNotEmpty()
    public reason: string;
}
