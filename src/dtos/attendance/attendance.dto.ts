/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString } from 'class-validator';

export class CreateAttendanceDto {  
  @IsString()
  public employeeId: string;
  
  @IsString()
  public shiftTypeId: string;

  @IsString()
  public statusId: string;

  @IsString()
  public startTime: string;

  @IsString()
  public endTime: string;
}
