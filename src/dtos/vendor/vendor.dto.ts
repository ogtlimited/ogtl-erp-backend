/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty,IsEmail} from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  @IsString()
  public fullName: string;

  @IsNotEmpty()
  @IsString()
  public code: string;

  @IsNotEmpty()
  @IsString()
  public company: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public phone: string;

  @IsNotEmpty()
  @IsString()
  public address: string;

  @IsNotEmpty()
  @IsString()
  public city: string;

@IsNotEmpty()
  @IsString()
  public stateRegion: string;

@IsNotEmpty()
  @IsString()
  public country: string;


}

export class UpdateVendorDto {
  @IsString()
  public _id: string;


  @IsString()
  public fullName: string;


  @IsString()
  public code: string;


  @IsString()
  public company: string;


  @IsString()
  @IsEmail()
  public email: string;


  @IsString()
  public phone: string;


  @IsString()
  public address: string;


  @IsString()
  public city: string;


  @IsString()
  public stateRegion: string;


  @IsString()
  public country: string;
}
