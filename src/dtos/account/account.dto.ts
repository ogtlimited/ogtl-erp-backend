/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsBoolean, IsOptional } from 'class-validator';

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

    @IsOptional()
    @IsString()
    public currency: string;

    @IsOptional()
    public parent: string;
  
}

export class PutAccountDto {  

    @IsString()
    public account_name: string;

    @IsOptional()
    @IsString()
    public account_number: string;

    @IsOptional()
    @IsString()
    public account_type: string;

    @IsOptional()
    @IsString()
    public currency: string;

  
}

export class UpdateAncestoryDto {  

    @IsString()
    public parent: string;
  
}