/* eslint-disable prettier/prettier */
import { IsString, IsDateString, IsNumber, IsArray } from 'class-validator';

export class CreateBillsDto {

  @IsString()
  public vendor: string;

  @IsString()
  public ref: string;

  @IsDateString()
  public bill_date: string;

  @IsDateString()
  public due_date: string;

  @IsString()
  public type: string;

  @IsArray()
  public productItems: string;

  @IsNumber()
  public total_amount: number;

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

  @IsString()
  public type: string;

  @IsArray()
  public productItems: string;

  @IsNumber()
  public total_amount: number;

  @IsString()
  public status: string;
}
