/* eslint-disable prettier/prettier */
import { IsString, IsDateString, IsOptional, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class CreateBillsDto {
  @IsString()
  public vendor: string;

  @IsString()
  public account: string;

  @IsOptional()
  @IsDateString()
  public bill_date: string;

  @IsDateString()
  public due_date: string;

  @IsArray()
  public productItems: string;

  @IsArray()
  public units: [];

  @IsNumber()
  public total_amount: number;

  @IsOptional()
  @IsNumber()
  public balance: number;


}

export class UpdateBillsDto {
  @IsString()
  public _id: string;

  @IsString()
  public account: string;

  @IsString()
  public vendor: string;

  @IsString()
  public ref: string;

  @IsDateString()
  public bill_date: string;

  @IsDateString()
  public due_date: string;

  @IsArray()
  public productItems: [];

  @IsArray()
  public units: [];

  @IsNumber()
  public total_amount: number;

  @IsString()
  public status: string;

  // @IsNumber()
  // public paid: number;
  //
  // @IsNumber()
  // public balance: number;
}

export class UpdateBillsStatus {
  @IsString()
  public _id: string;

  @IsString()
  @IsNotEmpty()
  public status: string
}
