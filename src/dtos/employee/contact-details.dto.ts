/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDetailsDto {
  @IsOptional()
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsNotEmpty()
  @IsString()
  public mobile: string;

  @IsNotEmpty()
  @IsString()
  public personal_email: string;

  @IsString()
  public permanent_address_is: string;

  @IsString()
  public permanent_address: string;

  @IsString()
  public current_address_is: string;

  @IsString()
  public current_address: string;
}
export class UpdateContactDetailsDto {
  @IsString()
  public _id: string;

  @IsString()
  public employee_id: string;

  @IsString()
  public mobile: string;

  @IsString()
  public personal_email: string;

  @IsString()
  public permanent_address_is: string;

  @IsString()
  public permanent_address: string;

  @IsString()
  public current_address_is: string;

  @IsString()
  public current_address: string;
}
