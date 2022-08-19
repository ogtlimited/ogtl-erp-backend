import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePublicHolidayDto {
  @IsDateString()
  public startDate: string;

  @IsDateString()
  public endDate: string;

  @IsString()
  public title: string;

  @IsString()
  public project_id: string;

  @IsString()
  @IsOptional()
  public updated_by: string;

  @IsString()
  @IsOptional()
  public created_by: string;

  @IsString()
  @IsOptional()
  public deleted_by: string;

  @IsBoolean()
  public deleted: boolean;
}
