/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateJobOpeningDto {
  @IsNotEmpty()
  @IsString()
  public job_title: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  public location: string;

  @IsOptional()
  @IsDateString()
  public date: string;

  @IsOptional()
  @IsDateString()
  public deadline: string;

  @IsOptional()
  @IsString()
  public type: string;

  @IsOptional()
  @IsNumber()
  public experience: number;

  @IsOptional()
  @IsNumber()
  public vacancy: number;
}
export class CreateDefaultJobOpeningDto {
  @IsNotEmpty()
  @IsString()
  public job_title: string;

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

  @IsOptional()
  @IsString()
  public location: string;

  @IsOptional()
  @IsDateString()
  public date: string;

  @IsOptional()
  @IsDateString()
  public deadline: string;

  @IsOptional()
  @IsString()
  public type: string;


  @IsOptional()
  @IsNumber()
  public experience: number;

  @IsOptional()
  @IsNumber()
  public vacancy: number;
}
