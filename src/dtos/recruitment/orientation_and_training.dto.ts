/*eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateOrientationDto {
  @IsNotEmpty()
  @IsString()
  public department_id: string;

  @IsNotEmpty()
  @IsDateString()
  public start_date: string;

  @IsNotEmpty()
  @IsString()
  public end_date: string;

  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsOptional()
  @IsString()
  public attendance : string;
}


export class UpdateOrientationDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public department_id: string;

  @IsNotEmpty()
  @IsDateString()
  public start_date: string;

  @IsNotEmpty()
  @IsString()
  public end_date: string;

  @IsNotEmpty()
  @IsString()
  public type: string;

  
  @IsString()
  public attendance : string;


}