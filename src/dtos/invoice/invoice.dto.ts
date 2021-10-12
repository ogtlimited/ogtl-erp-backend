/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDateString, IsArray } from 'class-validator';

export class CreateInvoiceDto {
  
    @IsString()
    public customer: string;

    @IsString()
    public ref: string;

    @IsDateString()
    public invoice_date: string;

    @IsDateString()
    public due_date: string;

    @IsArray()
    public productItems: string;

}

export class UpdateInvoiceDto {

    @IsDateString()
    public due_date: string;

    @IsArray()
    public productItems: string;


}
