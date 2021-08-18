import { IsString,IsDate } from 'class-validator';

export class CreateShiftRequestDto {
  @IsString()
  public shift_type_id: string;

  @IsString()
  public employee_id: string;

  @IsDate()
  public from_date: Date;

  @IsDate()
  public to_date: Date;
}
