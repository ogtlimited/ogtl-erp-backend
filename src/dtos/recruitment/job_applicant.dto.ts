/* eslint-disable prettier/prettier */

import { IsString, IsOptional, IsNotEmpty, IsArray } from 'class-validator';

export class CreateJobApplicantDto {
  @IsNotEmpty()
  @IsString()
  public first_name: string;

  @IsNotEmpty()
  @IsString()
  public last_name: string;

  @IsOptional()
  @IsString()
  public middle_name: string;

  @IsNotEmpty()
  @IsString()
  public email_address: string;

  @IsNotEmpty()
  @IsString()
  public mobile: string;

  @IsOptional()
  @IsString()
  public alternate_mobile: string;

  @IsNotEmpty()
  @IsString()
  public job_opening_id: string;

  @IsNotEmpty()
  @IsString()
  public highest_qualification: string;

  @IsNotEmpty()
  @IsString()
  public certifications: string;

  @IsNotEmpty()
  @IsArray()
  public languages_spoken: [];

  @IsOptional()
  @IsString()
  public application_source: string;

  @IsOptional()
  @IsString()
  public referal_name: string;

  @IsNotEmpty()
  @IsString()
  public resume_attachment: string;

  @IsOptional()
  @IsString()
  public cover_letter: string;

  @IsOptional()
  @IsString()
  public video_attachment: string;
}
export class UpdateJobApplicantDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public first_name: string;

  @IsNotEmpty()
  @IsString()
  public last_name: string;

  @IsOptional()
  @IsString()
  public middle_name: string;

  @IsNotEmpty()
  @IsString()
  public email_address: string;

  @IsNotEmpty()
  @IsString()
  public job_opening_id: string;

  @IsOptional()
  @IsString()
  public application_source: string;

  @IsString()
  public status: string;

  @IsNotEmpty()
  @IsString()
  public resume_attachment: string;

  @IsOptional()
  @IsString()
  public cover_letter: string;

  @IsOptional()
  @IsString()
  public video_attachment: string;
}
