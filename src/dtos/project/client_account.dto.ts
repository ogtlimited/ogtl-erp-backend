import {IsString, IsNotEmpty, IsOptional, IsBoolean, IsEmail} from "class-validator"
export class ClientAccountDto{
    @IsString()
    @IsNotEmpty()
    user_name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsBoolean()
    @IsOptional()
    spammy: boolean;

    @IsBoolean()
    @IsOptional()
    deactivated: boolean;

    @IsString()
    @IsNotEmpty()
    client_id: string
    }