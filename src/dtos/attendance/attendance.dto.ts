/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsDateString, IsString } from 'class-validator';

export class CreateAttendanceDto {  
  @IsString()
  public employeeId: string;
  
  @IsString()
  public shiftTypeId: string;

  @IsString()
  public ogId: string;

  @IsString()
  public departmentId: string;

  @IsString()
  public clockInTime: string;
}

export class UpdateAttendanceDto {  
  @IsString()
  public attendanceId: string;
  
  @IsDateString()
  public clockOutTime: string;
}
