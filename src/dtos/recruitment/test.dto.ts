import { IsString, IsDate, IsEnum, IsOptional } from 'class-validator';
import { TestStatus, TestType } from '@interfaces/recruitment/test.interface';

export class CreateTestDto {
  @IsEnum(TestType)
  public test_type: TestType;

  @IsString()
  public job_applicant_id: string;

  @IsEnum(TestStatus)
  public status: TestStatus;

  @IsString()
  public hr_user: string;

  @IsOptional()
  @IsString()
  public score: string;

  @IsDate()
  public interview_date: Date;

  @IsString()
  public phone_number: string;

  @IsOptional()
  @IsString()
  public notes: string;
}