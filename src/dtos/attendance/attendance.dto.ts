/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateAttendanceDto {  
  @IsString()
  public _id: string;

  @IsString()
  public employee: string;

  @IsNumber()
  public incentiveAmount: Number;

  @IsString()
  public salaryComponent: string;

  @IsString()
  public additionalSalary: string;

  @IsDate()
  public payrollDate: Date;
}
