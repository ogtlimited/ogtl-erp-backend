/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateAttendanceDto {
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
  public shiftTypeId: string;

  @IsString()
  public employeeId: string;

  @IsString()
  @IsOptional()
  public projectId: string;

  @IsString()
  @IsOptional()
  public reason: string;
}
export class CreateManualAttendanceDto {
  @IsString()
  public ClockIn: string;
  
  @IsString()
  public ClockOut: string;

  @IsString()
  public ogid: string;

  @IsString()
  public reason: string;

  @IsString()
  @IsOptional()
  public Date: string;
}


export class CreateBulkAttendanceDto {
  @IsArray()
  public attendances: Array<Object>;
}

export class UpdateAttendanceDto {
  @IsString()
  public attendanceId: string;

  @IsDateString()
  public clockOutTime: string;

  @IsString()
  @IsOptional()
  public reason: string;
}
