import {IsString } from 'class-validator';

export class CreateDesignationDto{
    @IsString()
        public _id: string;

    @IsString()
        public designation: string;


}