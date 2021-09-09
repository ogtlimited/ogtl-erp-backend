/* eslint-disable prettier/prettier */
import { IsString,IsDateString, IsNotEmpty} from 'class-validator';

export class CreateWarningLetterDto {
  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsNotEmpty()
  @IsString()
  public reason: string;

  @IsNotEmpty()
  @IsString()
  public details: string;

  @IsNotEmpty()
  @IsString()
  public actions: string;

  @IsNotEmpty()
  @IsDateString()
  public date_issued: Date;

}
