import { IsString, IsDateString, IsEnum, IsOptional,IsNotEmpty } from 'class-validator';
import { TestStatus, TestType } from '@interfaces/recruitment/test.interface';

export class CreateTestDto {
  @IsNotEmpty()
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

  @IsDateString()
  public interview_date: Date;

  @IsString()
  public phone_number: string;

  @IsOptional()
  @IsString()
  public notes: string;
}
