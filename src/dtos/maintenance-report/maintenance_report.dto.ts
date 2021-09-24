/* eslint-disable prettier/prettier */

import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMaintenanceReportDto {
  @IsString()
  @IsNotEmpty()
  public description: string

  @IsDateString()
  @IsNotEmpty()
  public date_of_report: Date

  @IsString()
  @IsNotEmpty()
  public created_by: string

  @IsString()
  @IsNotEmpty()
  public issues: string

  @IsString()
  @IsNotEmpty()
  public recommendation: string
}

export class UpdateMaintenanceReportDto {
  @IsString()
  public _id: string;

  @IsString()
  @IsOptional()
  public description: string

  @IsDateString()
  @IsOptional()
  public date_of_report: Date

  @IsString()
  @IsOptional()
  public created_by: string

  @IsString()
  @IsOptional()
  public issues: string

  @IsString()
  @IsOptional()
  public recommendation: string
}
