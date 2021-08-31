/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateDeductionTypesDto {  
  @IsString()
  public deductionTypeId: string;

  @IsString()
  public employeeId: string;

}
