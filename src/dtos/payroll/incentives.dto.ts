/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate } from 'class-validator';

export class CreateIncentiveDto {  
  @IsString()
  public employeeId: string;

  @IsString()
  public additionalSalary: string;

  @IsString()
  public salaryComponent: string;

  @IsString()
  public status: string;

  @IsString()
  public payrollDate: Date;

}
