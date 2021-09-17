import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobOpeningDto {
  @IsNotEmpty()
  @IsString()
  public job_title: string;

  @IsNotEmpty()
  @IsString()
  public designation_id: string;

  @IsOptional()
  @IsString()
  public project_id: string;

  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public description: string;
}

export class UpdateJobOpeningDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public job_title: string;

  @IsNotEmpty()
  @IsString()
  public designation_id: string;

  @IsOptional()
  @IsString()
  public project_id: string;

  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public description: string;
}
