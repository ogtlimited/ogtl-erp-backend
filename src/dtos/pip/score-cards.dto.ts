/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString,IsNumber } from "class-validator";

export class CreateScoreCardDto{
    @IsNotEmpty()
    @IsString()
    public employee_id: string;

    @IsNotEmpty()
    @IsNumber()
    public company_values_score :number;

    @IsNotEmpty()
    @IsNumber()
    public performance_score :number;

}

export class UpdateScoreCardDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
    public employee_id: string;

    @IsNotEmpty()
    @IsNumber()
    public company_values_score :number;

    @IsNotEmpty()
    @IsNumber()
    public performance_score :number;

}