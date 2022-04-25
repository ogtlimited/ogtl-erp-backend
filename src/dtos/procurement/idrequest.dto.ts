/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIdRequestDto {
  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsNotEmpty()
  @IsString()
  public date: string;

  @IsOptional()
  @IsString()
  public notes: string;
}

export class UpdateIdRequestDto {
  @IsString()
  public _id: string;

  @IsString()
  public employee_id: string;

  @IsString()
  public date: string;

  @IsString()
  public notes: string;

  @IsString()
  public status: string;
}
