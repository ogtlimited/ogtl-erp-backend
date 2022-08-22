import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePublicHolidayDto {
  @IsDateString()
  public start_date: string;

  @IsDateString()
  public end_date: string;

  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public project_id: string;

  @IsString()
  @IsOptional()
  public updated_by: string;

  @IsString()
  public created_by: string;

  @IsString()
  @IsOptional()
  public deleted_by: string;

  @IsBoolean()
  @IsOptional()
  public deleted: boolean;
}
