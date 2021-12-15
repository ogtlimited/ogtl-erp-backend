/* eslint-disable prettier/prettier */
import { IsString,IsNotEmpty,IsOptional } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  public expectedWorkTime: string;

}

export class UpdateShiftTypeDto {
  @IsString()
  public _id: string;

  @IsOptional()
  @IsString()
  public shift_name: string;

  @IsOptional()
  @IsString()
  public start_time: string;

  @IsOptional()
  @IsString()
  public end_time: string;

  @IsOptional()
  @IsString()
  public expectedWorkTime: string;
}
