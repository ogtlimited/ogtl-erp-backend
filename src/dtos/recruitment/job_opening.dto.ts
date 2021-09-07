import { IsString,IsEnum,IsNotEmpty ,IsOptional} from 'class-validator';
import { Status } from '@interfaces/recruitment/job_opening.interface';

export class CreateJobOpeningDto {
  @IsNotEmpty()
  @IsString()
  public job_title: string;

  @IsNotEmpty()
  @IsString()
  public designation_id: string;

  @IsNotEmpty()
  @IsString()
  public project_id: string;

   @IsEnum(Status)
  public status: Status;

   @IsOptional()
   @IsString()
  public description: string;
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

  @IsNotEmpty()
  @IsString()
  public project_id: string;

  @IsEnum(Status)
  public status: Status;

  @IsOptional()
  @IsString()
  public description: string;
}
