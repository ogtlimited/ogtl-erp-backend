/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreatePaymentDto {

  @IsOptional()
  @IsString()
  public bill: string;

  @IsOptional()
  @IsString()
  public invoice: string;

  @IsNotEmpty()
  @IsDateString()
  public date: Date;

  @IsNotEmpty()
  @IsString()
  public paymentMethod: string;


  @IsNotEmpty()
  @IsNumber()
  public total_amount: number;

  @IsNotEmpty()
  @IsString()
  public paymentStatus: string;



}

export class UpdatePaymentDto {
  @IsString()
  public _id: string;


  @IsString()
  public number: string;


  @IsOptional()
  @IsString()
  public bill: string;

  @IsOptional()
  @IsString()
  public invoice: string;


  @IsDateString()
  public date: Date;


  @IsString()
  public paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  public total_amount: number;


  @IsString()
  public status: string;

  @IsString()
  public paymentStatus: string;
}
