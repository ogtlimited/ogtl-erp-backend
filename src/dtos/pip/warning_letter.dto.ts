import { IsEnum, IsString ,IsDate, IsNotEmpty,IsNumber,IsBoolean} from 'class-validator';
import { Reasons } from '@interfaces/pip-interface/warning_letter.interface';

export class CreateWarningLetterDto {
  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsNotEmpty()
  @IsString()
  public hr_user_id: string;

  @IsNotEmpty()
  @IsEnum(Reasons)
  public reason: Reasons[];

  @IsNotEmpty()
  @IsString()
  public details: string;

  @IsNotEmpty()
  @IsString()
  public actions: string;

  @IsNotEmpty()
  @IsDate()
  public date_issued: Date;

  @IsNumber()
  public warningCount: number;

  @IsBoolean()
  public isInPip: boolean;

}
