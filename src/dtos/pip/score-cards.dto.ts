/* eslint-disable prettier/prettier */
import { IsNotEmpty,IsString,IsNumber } from "class-validator";

export class CreateScoreCardDto{
    @IsNotEmpty()
    @IsString()
    public employee_id: string;

    @IsNotEmpty()
    @IsString()
    public company_values_score :string;

    @IsNotEmpty()
    @IsString()
    public performance_score :string;

}

export class UpdateScoreCardDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
    public employee_id: string;

    @IsNotEmpty()
    @IsString()
    public company_values_score :string;

    @IsNotEmpty()
    @IsString()
    public performance_score :string;

}