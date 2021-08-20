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
  public campaign_id: string;

   @IsEnum(Status)
  public status: Status;

   @IsOptional()
   @IsString()
  public description: string;
}
