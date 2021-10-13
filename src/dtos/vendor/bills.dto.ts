/* eslint-disable prettier/prettier */
import { IsString, IsDateString,IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateBillsDto {
  @IsString()
  public vendor: string;

  @IsString()
  public ref: string;

  @IsDateString()
  public bill_date: string;

  @IsDateString()
  public due_date: string;

  @IsArray()
  public productItems: string;

  @IsNumber()
  public total_amount: number;

  @IsOptional()
  @IsNumber()
  public paid: number;

  @IsOptional()
  @IsNumber()
  public balance: number;

  @IsString()
  public status: string;

}

export class UpdateBillsDto {
  @IsString()
  public _id: string;

  @IsString()
  public vendor: string;

  @IsString()
  public ref: string;

  @IsDateString()
  public bill_date: string;

  @IsDateString()
  public due_date: string;

  @IsArray()
  public productItems: string;

  @IsNumber()
  public total_amount: number;

  @IsString()
  public status: string;

  @IsNumber()
  public paid: number;

  @IsNumber()
  public balance: number;
}
