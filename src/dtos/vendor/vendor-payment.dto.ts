/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateVendorPaymentDto {
  @IsNotEmpty()
  @IsString()
  public number: string;

  @IsNotEmpty()
  @IsString()
  public vendor: string;

  @IsNotEmpty()
  @IsDateString()
  public date: Date;

  @IsNotEmpty()
  @IsString()
  public paymentMethod: string;


@IsNotEmpty()
  @IsNumber()
  public amount: string;

  @IsNotEmpty()
  @IsString()
  public status: string;

}

export class UpdateVendorPaymentDto {
  @IsString()
  public _id: string;


  @IsString()
  public number: string;


  @IsString()
  public vendor: string;


  @IsDateString()
  public date: Date;


  @IsString()
  public paymentMethod: string;


  @IsString()
  public journal: string;


  @IsNumber()
  public amount: string;


  @IsString()
  public status: string;
}
