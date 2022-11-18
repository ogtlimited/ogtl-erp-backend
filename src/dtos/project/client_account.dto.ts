import {IsString, IsNotEmpty, IsOptional, IsBoolean, IsEmail, Length} from "class-validator"
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
    activated: boolean;
    
    @IsBoolean()
    @IsOptional()
    spammy: boolean;

    @IsString()
    @IsNotEmpty()
    client_id: string
    }

    export class UpdateClientAccountDto{
    
        @IsString()
        @IsNotEmpty()
        @Length(8,40)
        password: string;
    
        @IsBoolean()
        @IsNotEmpty()
        activated: boolean;
        
        @IsBoolean()
        @IsNotEmpty()
        spammy: boolean;
    
        @IsString()
        @IsOptional()
        client_id: string
        }