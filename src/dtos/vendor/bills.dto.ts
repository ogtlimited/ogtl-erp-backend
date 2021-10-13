/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateBillsDto {
  @IsNotEmpty()
  @IsString()
  public number: string;

  @IsNotEmpty()
  @IsString()
  public vendor: string;

  @IsNotEmpty()
  @IsDateString()
  public billDate: Date;

  @IsNotEmpty()
  @IsDateString()
  public dueDate: Date;

  @IsNotEmpty()
  @IsString()
  public reference: string;

  @IsNotEmpty()
  @IsNumber()
  public total: string;

  @IsNotEmpty()
  @IsString()
  public status: string;

}

export class UpdateBillsDto {
  @IsString()
  public _id: string;


  @IsString()
  public number: string;


  @IsString()
  public vendor: string;


  @IsDateString()
  public billDate: Date;


  @IsDateString()
  public dueDate: Date;


  @IsString()
  public reference: string;


  @IsNumber()
  public total: string;


  @IsString()
  public status: string;
}
