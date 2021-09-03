import {IsNotEmpty,IsEmail, IsString } from 'class-validator';
export class CreateCompanyDto{

    @IsNotEmpty()
    @IsString()
    public companyName: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    public companyEmail : string;

    @IsNotEmpty()
    @IsString()
    public logo : string;

    @IsNotEmpty()
    @IsString()
    public abbreviation : string;


    



}

export class UpdateCompanyDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
    public companyName: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    public companyEmail : string;

    @IsNotEmpty()
    @IsString()
    public logo : string;

    @IsNotEmpty()
    @IsString()
    public abbreviation : string;

}