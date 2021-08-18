import { IsString,IsDate,IsEnum ,IsOptional} from 'class-validator';
import { JobOfferStatus } from '@interfaces/recruitment/job_offer.interface';

export class CreateJobOfferDto {
  @IsString()
  public job_applicant_id: string;

  @IsEnum(JobOfferStatus)
  public status: JobOfferStatus;

  @IsDate()
  public offer_date: Date;

  @IsString()
  public designation_id: string;

  @IsString()
  public job_offer_terms: string[];

  @IsOptional()
  @IsString()
  public terms_and_conditions: string;
}
