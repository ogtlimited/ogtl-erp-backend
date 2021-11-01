/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDateString, IsArray, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  
    @IsString()
    public customer: string;

    @IsString()
    public account: string;

    @IsDateString()
    public invoice_date: string;

    @IsDateString()
    public due_date: string;

    @IsArray()
    public productItems: string;

    @IsNumber()
    public total_amount: number;

    @IsOptional()
    @IsNumber()
    public paid: number;

    @IsArray()
    public units: [];

    @IsOptional()
    @IsNumber()
    public balance: number;

}

export class UpdateInvoiceDto {

    @IsString()
    public customer: string;

    @IsString()
    public account: string;
  
    @IsString()
    public ref: string;
  
    @IsDateString()
    public invoice_date: string;

    @IsDateString()
    public due_date: string;

    @IsString()
    public status: string;

    @IsOptional()
    @IsArray()
    public productItems: string;

    @IsNumber()
    public total_amount: number;

    @IsOptional()
    @IsNumber()
    public paid: number;

    @IsArray()
    public units: [];

    @IsOptional()
    @IsNumber()
    public balance: number;


}

export class UpdateInvoiceStatus {
    @IsString()
    public _id: string;
  
    @IsString()
    @IsNotEmpty()
    public status: string
  }