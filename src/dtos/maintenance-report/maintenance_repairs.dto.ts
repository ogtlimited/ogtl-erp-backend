/* eslint-disable prettier/prettier */

import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaintenanceAndRepairDto {
  @IsString()
  @IsNotEmpty()
  public asset_id: string

  @IsString()
  @IsNotEmpty()
  public issue: string

  @IsDateString()
  @IsNotEmpty()
  public date_of_maintenance: Date

  @IsNumber()
  @IsOptional()
  public amount: string

  @IsString()
  @IsOptional()
  public type: string
}

export class UpdateMaintenanceAndRepairDto {
  @IsString()
  public _id: string;

  @IsString()
  @IsOptional()
  public asset_id: string

  @IsString()
  @IsOptional()
  public issue: string

  @IsDateString()
  @IsOptional()
  public date_of_maintenance: Date

  @IsNumber()
  @IsOptional()
  public amount: string

  @IsString()
  @IsOptional()
  public type: string


}

export class UpdateMaintenanceStatus {
  @IsString()
  public _id: string;

  @IsString()
  @IsNotEmpty()
  public status: string
}
