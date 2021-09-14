/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsEmail } from 'class-validator';

export class TrainingProgramDto {  
  @IsString()
  public program_name: string;

  @IsString()
  public status: string;

  @IsString()
  public trainer_name: string;

  @IsEmail()
  public trainer_email: string;

  @IsString()
  public supplier_id: string;

  @IsString()
  public contact_number: string;

  @IsString()
  public description: string;
}

export class PutTrainingProgramDto {  
  @IsString()
  public program_name: string;

  @IsString()
  public status: string;

  @IsString()
  public trainer_name: string;

  @IsEmail()
  public trainer_email: string;

  @IsString()
  public supplier_id: string;

  @IsString()
  public contact_number: string;

  @IsString()
  public description: string;
}