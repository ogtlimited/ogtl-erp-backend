/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsBoolean, IsOptional,IsNumber } from 'class-validator';

export class AccountDto {  

    @IsString()
    public account_name: string;

    @IsOptional()
    @IsString()
    public account_number: string;

    @IsOptional()
    @IsString()
    public account_type: string;

    @IsBoolean()
    public is_group: boolean;

    @IsBoolean()
    public is_default: boolean;

    @IsOptional()
    @IsNumber()
    public balance: number;

    @IsOptional()
    @IsString()
    public currency: string;

    @IsOptional()
    public parent: string;

    @IsOptional()
    public number_prefix: string;
  
}

export class PutAccountDto {

    @IsString()
    public account_name: string;

    @IsOptional()
    @IsString()
    public account_number: string;

    @IsOptional()
    @IsNumber()
    public balance: number;

    @IsOptional()
    @IsString()
    public account_type: string;

    @IsOptional()
    @IsString()
    public currency: string;
    
}

export class PutAccountBalanceDto {
    @IsNumber()
    public balance: number;
}
export class UpdateAncestoryDto {  

    @IsString()
    public parent: string;
  
}