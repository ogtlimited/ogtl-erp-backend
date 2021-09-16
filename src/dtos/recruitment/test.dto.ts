/* eslint-disable prettier/prettier */

import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  public test_type: string;

  @IsString()
  public job_applicant_id: string;

  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public score: string;

  @IsDateString()
  public interview_date: Date;

  @IsString()
  public phone_number: string;

  @IsOptional()
  @IsString()
  public notes: string;
}

export class UpdateTestDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public test_type: string;

  @IsString()
  public job_applicant_id: string;

  @IsString()
  public status: string;

  @IsOptional()
  @IsString()
  public score: string;

  @IsDateString()
  public interview_date: Date;

  @IsString()
  public phone_number: string;

  @IsOptional()
  @IsString()
  public notes: string;
}
