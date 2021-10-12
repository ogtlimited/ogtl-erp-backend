/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */


import { IsString, IsDateString } from 'class-validator';

export class CreateJournalDto {

    @IsString()
    public account: string;

    @IsString()
    public ref: string;

    @IsString()
    public debit: string;

    @IsString()
    public credit: string;

    @IsString()
    public description: string;

    @IsDateString()
    public date: string;

    @IsString()
    public status: string;

}