/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class CreateSalaryComponentDto {  

    @IsString()
    public title: string;

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

    @IsNumber()
    incentiveAmount: Number;

    @IsArray()
    type: string;

}
