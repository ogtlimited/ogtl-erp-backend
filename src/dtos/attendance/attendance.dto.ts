/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsArray, IsDateString, IsOptional, IsString} from 'class-validator';

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

export class CreateBulkAttendanceDto {
  @IsArray()
  public attendances: Array<Object>;
}

export class UpdateAttendanceDto {
  @IsString()
  public attendanceId: string;

  @IsDateString()
  public clockOutTime: string;
}
