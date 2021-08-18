/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate } from 'class-validator';

export class CreateAttendanceDto {  
  @IsString()
  public _id: string;

  @IsString()
  public employeeID: string;

  @IsString()
  public shift: string;

  @IsString()
  public status: string;

  @IsDate()
  public startTime: Date;

  @IsDate()
  public endTime: Date;

}
