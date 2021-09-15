/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsDateString,  IsNotEmpty,  IsString } from 'class-validator';

export class CreateTerminationDto {
    @IsNotEmpty()
    @IsString()
    public employee: string;

    @IsNotEmpty()
    @IsString()
    public reason: string;

    @IsNotEmpty()
    @IsString()
    public terminationType: string;


    @IsNotEmpty()
    @IsDateString()
    public terminationDate: Date;

}

export class UpdateTerminationDto {
    @IsNotEmpty()
    @IsString()
    public _id : string

    @IsNotEmpty()
    @IsString()
    public employee: string;

    @IsNotEmpty()
    @IsString()
    public terminationType: string;

    @IsNotEmpty()
    @IsString()
    public reason: string;

    @IsNotEmpty()
    @IsDateString()
    public terminationDate: Date;

}