/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate } from 'class-validator';

export class CreateIncentiveDto {  
  @IsString()
  public _id: string;

  @IsString()
  public employee: string;

  @IsString()
  public shift: string;

  @IsString()
  public status: string;

  @IsDate()
  public startTime: Date;

  @IsDate()
  public endTime: Date;

}
