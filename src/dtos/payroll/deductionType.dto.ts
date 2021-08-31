/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateDeductionTypesDto {  
  @IsString()
  public title: string;

  @IsString()
  public department: string;

  @IsNumber()
  public amount: string;

  @IsString()
  public status: string;

}
