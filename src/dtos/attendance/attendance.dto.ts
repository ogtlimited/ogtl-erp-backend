/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAttendanceDto {  
  @IsDateString()
  public clockInTime: string;

  @IsString()
  @IsOptional()
  public departmentId: string;

  @IsString()
  @IsOptional()
  public projectId: string;
}

export class UpdateAttendanceDto {  
  @IsString()
  public attendanceId: string;
  
  @IsDateString()
  public clockOutTime: string;
}
