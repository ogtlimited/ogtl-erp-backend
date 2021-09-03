/* eslint-disable prettier/prettier */
import { IsString,IsDateString,IsNotEmpty } from 'class-validator';

export class CreateShiftRequestDto {
  @IsNotEmpty()
  @IsString()
  public shift_type_id: string;

  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsDateString()
  public from_date: Date;

  @IsDateString()
  public to_date: Date;
}

export class UpdateShiftRequestDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public shift_type_id: string;

  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsDateString()
  public from_date: Date;

  @IsDateString()
  public to_date: Date;
}
