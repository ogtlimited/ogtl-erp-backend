import {IsString } from 'class-validator';

export class CreateEmployeeTypeDto{
    @IsString()
        public _id: string;
    
    @IsString()
        type: string;
}