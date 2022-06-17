/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsString, IsDate, IsNumber, IsArray, IsEnum } from 'class-validator';

export class CreateSalarySlipDto {

    @IsString()
    public action: string;

}

/*



*/
