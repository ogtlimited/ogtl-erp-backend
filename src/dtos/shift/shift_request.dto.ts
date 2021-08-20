/* eslint-disable prettier/prettier */
import { IsString,IsDate,IsNotEmpty } from 'class-validator';

export class CreateShiftRequestDto {
  @IsNotEmpty()
  @IsString()
  public shift_type_id: string;

  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsDate()
  public from_date: Date;

  @IsDate()
  public to_date: Date;
}
