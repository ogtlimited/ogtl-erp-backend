/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDeductionTypeDto {  
  @IsString()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public departmentId: string;

  @IsNumber()
  public amount: string;

  @IsString()
  @IsOptional()
  public status: string;
}
