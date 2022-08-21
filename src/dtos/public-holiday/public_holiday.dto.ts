import { IsDateString, IsOptional, IsString } from 'class-validator';

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
}
