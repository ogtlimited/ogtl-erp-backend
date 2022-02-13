import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ISalarySetting } from '@interfaces/salary-settings/salary_settings.interface';

export class CreateSalarySettingDto implements ISalarySetting {
  @IsString()
  public title: string;

  @IsString()
  public type: string;

  @IsNumber()
  public percentage: Number;

  @IsNumber()
  public startRange: Number;

  @IsNumber()
  public endRange: Number;
}

export class UpdateSalarySettingDto implements ISalarySetting {
  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @IsOptional()
  public type: string;

  @IsNumber()
  @IsOptional()
  public startRange: Number;

  @IsNumber()
  @IsOptional()
  public percentage: Number;

  @IsNumber()
  @IsOptional()
  public endRange: Number;
}
