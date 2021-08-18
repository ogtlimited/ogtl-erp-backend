import { IsString,IsEnum ,IsOptional} from 'class-validator';
import { JobApplicantStatus } from '@interfaces/recruitment/job_applicant.interface';

export class CreateJobApplicantDto {
  @IsString()
  public applicant_name: string;

  @IsString()
  public email_address: string;

  @IsString()
  public job_opening_id: string;

  @IsOptional()
  @IsString()
  public application_source: string;

  @IsEnum(JobApplicantStatus)
  public status: JobApplicantStatus;

  @IsString()
  public resume_attachment: string;

  @IsOptional()
  @IsString()
  public cover_letter: string;

  @IsOptional()
  @IsString()
  public video_attachment: string;
}
