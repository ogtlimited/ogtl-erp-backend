/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsArray, IsOptional, IsString } from "class-validator";

export class CreatePayrollArchiveDto {
  @IsString()
  @IsOptional()
  public employee: string

  @IsString()
  @IsOptional()
  public salarySlip: string;

  @IsString()
  @IsOptional()
  public paid: string;

  @IsString()
  @IsOptional()
  public status: string;

  @IsArray()
  public slips: Array<any>;
}
