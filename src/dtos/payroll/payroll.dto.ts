/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsOptional,  IsDateString } from 'class-validator';

export class CreatePayrollDto {  
  
  // @IsString()
  // public branch: string;

  @IsString()
  @IsOptional()
  public departmentId: string;
  
  @IsString()
  @IsOptional()
  public projectId: string;

  @IsDateString()
  @IsOptional()
  public startDate: string;

  @IsDateString()
  @IsOptional()
  public endDate: string;
  
}
