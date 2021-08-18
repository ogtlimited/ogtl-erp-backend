/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsEmail, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  public ogId: string;

  @IsString()
  public fingerprint_details: string;

  @IsString()
  public first_name: string;

  @IsString()
  public last_name: string;

  @IsString()
  public password: string;

  @IsEmail()
  public company_email: string;

  @IsString()
  public dob: string;

  @IsString()
  public day_of_birth: string;

  @IsString()
  public month_of_birth: string;

  @IsString()
  public campaign_id: string;

  @IsString()
  public branch_id: string;

  @IsString()
  public designation_id: string;

  @IsString()
  public employment_type_id: string;

  @IsString()
  public health_insurance_id: string;

  @IsString()
  public shift_type_id: string;

  @IsString()
  public is_admin: string;

  @IsString()
  public gender: string;

  @IsString()
  public profile_pic: string;

  @IsString()
  public password_reset_count: string;

  @IsString()
  public active: string;
}
