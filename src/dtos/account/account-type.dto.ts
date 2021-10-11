/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';

export class AccountTypeDto {  

    @IsString()
    public name: string;
  
}

export class PutAccountTypeDto {  

    @IsString()
    public name: string;
  
}