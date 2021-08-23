/* eslint-disable prettier/prettier */
import { IsString,IsNotEmpty } from 'class-validator';

export class CreateShiftTypeDto {
  @IsNotEmpty()
  @IsString()
  public shift_name: string;

  @IsNotEmpty()
  @IsString()
  public start_time: string;

  @IsNotEmpty()
  @IsString()
  public end_time: string;
}

export class UpdateShiftTypeDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public shift_name: string;

  @IsNotEmpty()
  @IsString()
  public start_time: string;

  @IsNotEmpty()
  @IsString()
  public end_time: string;
}
