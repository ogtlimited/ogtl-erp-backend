/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsNumber } from 'class-validator';

export class CreatNotesDto {  
  @IsString()
  public title: string;

  @IsString()
  public employeeId: string;

  @IsString()
  public description: string;

  


}