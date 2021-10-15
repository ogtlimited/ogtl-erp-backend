/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */


import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateJournalDto {

    @IsString()
    public account: string;

    @IsString()
    public ref: string;

    @IsNumber()
    public debit: number;

    @IsNumber()
    public credit: number;

    @IsString()
    public description: string;

    @IsDateString()
    public date: string;

}