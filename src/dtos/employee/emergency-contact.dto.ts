/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmergencyContactDto {
  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsNotEmpty()
  @IsString()
  public emergency_phone: string;

  @IsNotEmpty()
  @IsString()
  public emergency_contact_name: string;

  @IsString()
  public relation: string;
}

export class UpdateEmergencyContactDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsNotEmpty()
  @IsString()
  public emergency_phone: string;

  @IsNotEmpty()
  @IsString()
  public emergency_contact_name: string;

  @IsString()
  public relation: string;
}
