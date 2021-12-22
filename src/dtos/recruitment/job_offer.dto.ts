/* eslint-disable prettier/prettier */
import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateJobOfferDto {
  @IsNotEmpty()
  @IsString()
  public job_applicant_id: string;

  @IsDateString()
  public offer_date: Date;

  @IsString()
  public designation_id: string;

  @IsString()
  public job_offer_terms: string[];

  @IsOptional()
  @IsString()
  public terms_and_conditions: string;
}

export class UpdateJobOfferDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public job_applicant_id: string;

  @IsString()
  public status: string;

  @IsDateString()
  public offer_date: Date;

  @IsString()
  public designation_id: string;

  @IsOptional()
  @IsString()
  public job_offer_terms: string[];

  @IsOptional()
  @IsString()
  public terms_and_conditions: string;
}
