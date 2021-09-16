/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsDateString,  IsNotEmpty,  IsString } from 'class-validator';

export class CreatePromotionDto {
    @IsNotEmpty()
    @IsString()
    public employee: string;

    @IsNotEmpty()
    @IsString()
    public newDesignation: string;

    @IsNotEmpty()
    @IsDateString()
    public promotionDate: Date;

}

export class UpdatePromotionDto {
    @IsNotEmpty()
    @IsString()
    public _id : string

    @IsNotEmpty()
    @IsString()
    public employee: string;

    @IsNotEmpty()
    @IsString()
    public newDesignation: string;

    @IsNotEmpty()
    @IsDateString()
    public promotionDate: Date;

}