/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductServiceDto {

    @IsString()
    public product: string;

    @IsString()
    public description: string;

    @IsOptional()
    @IsNumber()
    public rate: number;

    @IsOptional()
    @IsNumber()
    public price: number;



    @IsNumber()
    public tax: number;

}

export class UpdateProductServiceDto {

    @IsString()
    public _id: string;

    @IsString()
    public product: string;

    @IsString()
    public description: string;

    @IsNumber()
    public rate: number;

    @IsNumber()
    public price: number;


    @IsNumber()
    public tax: number;

}
