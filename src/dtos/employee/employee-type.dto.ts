import {IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeTypeDto{
    @IsString()
        public _id: string;
    
    @IsNotEmpty()
    @IsString()
        type: string;
}

export class UpdateEmployeeTypeDto{
    @IsString()
        public _id: string;
    
    @IsNotEmpty()
    @IsString()
        type: string;
}