/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateDeductionDto {
  @IsString()
  public deductionTypeId: string;

  @IsString()
  public employeeId: string;


  @IsBoolean()
  public useDailyRate: boolean;

  // @IsNumber()
  // //default 1
  // public quantity: Number;

  @IsNumber()
  @IsOptional()
  public amount : Number;
}
