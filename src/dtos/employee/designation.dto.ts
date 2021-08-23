import {IsNotEmpty, IsString } from 'class-validator';

export class CreateDesignationDto{
    @IsString()
        public _id: string;

    @IsNotEmpty()
    @IsString()
        public designation: string;


}
export class UpdateDesignationDto{
    @IsString()
        public _id: string;

    @IsNotEmpty()
    @IsString()
        public designation: string;


}
