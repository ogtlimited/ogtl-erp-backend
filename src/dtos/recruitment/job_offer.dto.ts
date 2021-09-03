import { IsString,IsDateString,IsEnum ,IsOptional,IsNotEmpty} from 'class-validator';
import { JobOfferStatus } from '@interfaces/recruitment/job_offer.interface';

export class CreateJobOfferDto {
  @IsNotEmpty()
  @IsString()
  public job_applicant_id: string;

  @IsEnum(JobOfferStatus)
  public status: JobOfferStatus;

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

  @IsEnum(JobOfferStatus)
  public status: JobOfferStatus;

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
