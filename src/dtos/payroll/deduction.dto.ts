/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsNumber } from 'class-validator';

export class CreateDeductionDto {
  @IsString()
  public deductionTypeId: string;

  @IsString()
  public employeeId: string;


  @IsString()
  public useDailyRate: boolean;

  // @IsNumber()
  // //default 1
  // public quantity: Number;

  @IsNumber()
  public amount : Number;
}
