import { IsString,IsEnum ,IsOptional,IsNotEmpty} from 'class-validator';
import { JobApplicantStatus } from '@interfaces/recruitment/job_applicant.interface';

export class CreateJobApplicantDto {
  @IsNotEmpty()
  @IsString()
  public applicant_name: string;

  @IsNotEmpty()
  @IsString()
  public email_address: string;

  @IsNotEmpty()
  @IsString()
  public job_opening_id: string;

  @IsOptional()
  @IsString()
  public application_source: string;

  @IsEnum(JobApplicantStatus)
  public status: JobApplicantStatus;

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
  public applicant_name: string;

  @IsNotEmpty()
  @IsString()
  public email_address: string;

  @IsNotEmpty()
  @IsString()
  public job_opening_id: string;

  @IsOptional()
  @IsString()
  public application_source: string;

  @IsEnum(JobApplicantStatus)
  public status: JobApplicantStatus;

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
