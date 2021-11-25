/* eslint-disable prettier/prettier */
import { IsString,IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  public description: String;

  @IsString()
  public assignedTo: String;

  @IsString()
  @IsOptional()
  public projectId: String;

  @IsString()
  @IsOptional()
  public departmentId: String;


  @IsString()
  public startDate: String;

  @IsString()
  public endDate: String;

}

export class UpdateShiftTypeDto {
  @IsString()
  public _id: string;

  @IsOptional()
  @IsString()
  public shift_name: string;

  @IsOptional()
  @IsString()
  public start_time: string;

  @IsOptional()
  @IsString()
  public end_time: string;
}
