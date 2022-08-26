import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePublicHolidayDto {
  [x: string]: any;
  @IsDateString()
  public start_date: string;

  @IsDateString()
  public end_date: string;

  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public project_id: string;

  // @IsString()
  // @IsOptional()
  // public updated_by: string;

  // @IsString()
  // @IsOptional()
  // public created_by: string;

  // @IsString()
  // @IsOptional()
  // public deleted_by: string;

  @IsBoolean()
  @IsOptional()
  public deleted: boolean;
}
