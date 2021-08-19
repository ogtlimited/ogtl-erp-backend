import { IsString } from 'class-validator';

export class CreateShiftTypeDto {
  @IsString()
  public shift_name: string;

  @IsString()
  public start_time: string;

  @IsString()
  public end_time: string;
}
