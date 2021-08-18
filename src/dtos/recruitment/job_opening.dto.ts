import { IsString,IsDate,IsEnum } from 'class-validator';
import { Status } from '@interfaces/recruitment/job_opening.interface';

export class CreateJobOpeningDto {
  @IsString()
  public job_title: string;

  @IsString()
  public designation_id: string;

  @IsDate()
  public campaign_id: Date;

   @IsEnum(Status)
  public status: Status;


}
