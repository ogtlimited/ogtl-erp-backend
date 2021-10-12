/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsNumber } from 'class-validator';

export class CreateProductServiceDto {

    @IsString()
    public product: string;

    @IsString()
    public description: string;

    @IsNumber()
    public rate: number;

    @IsNumber()
    public price: number;

    @IsNumber()
    public units: number;

    @IsNumber()
    public tax: number;

}

export class UpdateProductServiceDto {

    @IsString()
    public product: string;

    @IsString()
    public description: string;

    @IsNumber()
    public rate: number;

    @IsNumber()
    public price: number;

    @IsNumber()
    public units: number;

    @IsNumber()
    public tax: number;

}