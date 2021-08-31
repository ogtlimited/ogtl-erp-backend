/* eslint-disable prettier/prettier */
import { IsString, IsDate, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateWarningLetterDto {
  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsNotEmpty()
  @IsString()
  public hr_user_id: string;

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
  @IsDate()
  public date_issued: Date;

  @IsNumber()
  public warningCount: number;

  @IsBoolean()
  public isInPip: boolean;
    
  //@IsNotEmpty()
  @IsString()
  public Department_id : string;
}
