/* eslint-disable prettier/prettier */
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
     
    @IsNotEmpty()
    @IsString()
    public bankName : string;


    @IsNotEmpty()
    @IsString()
    public country : string;

    @IsNotEmpty()
    @IsString()
    public city : string;

    @IsNotEmpty()
    @IsString()
    public address : string;

    @IsNotEmpty()
    @IsString()
    public IBAN : string;
    
    @IsNotEmpty()
    @IsString()
    public swiftCode: string;



    



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

    @IsNotEmpty()
    @IsString()
    public bankName : string;


    @IsNotEmpty()
    @IsString()
    public country : string;

    @IsNotEmpty()
    @IsString()
    public city : string;

    @IsNotEmpty()
    @IsString()
    public address : string;

    @IsNotEmpty()
    @IsString()
    public IBAN : string;
    
    @IsNotEmpty()
    @IsString()
    public swiftCode: string;

}