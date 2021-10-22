/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDateString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateInvoiceDto {
  
    @IsString()
    public customer: string;

    @IsString()
    public ref: string;

    @IsDateString()
    public invoice_date: string;

    @IsDateString()
    public due_date: string;

    @IsString()
    public type: string;

    @IsString()
    public status: string;

    @IsArray()
    public productItems: string;

    @IsNumber()
    public total_amount: number;

}

export class UpdateInvoiceDto {

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

    @IsOptional()
    @IsNumber()
    public balance: number;


}

export class UpdateInvoiceStatusDto {
    @IsString()
    public status: string;
}
