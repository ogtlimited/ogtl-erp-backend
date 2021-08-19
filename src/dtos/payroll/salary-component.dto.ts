/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class CreateSalaryComponentDto {  
 
    @IsString()
    public salaryComponent: string;

    @IsString()
    public status: string;

    @IsString()
    salaryComponentAbbr: string;

    @IsString()
    description: string;

    @IsBoolean()
    isTaxApplicable: boolean;

    @IsBoolean()
    dependsOnPaymentDays: boolean;

    @IsNumber()
    amount: Number;

    @IsArray()
    type: Array<string>;

}
