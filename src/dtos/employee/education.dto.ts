import {IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEducationDto{

    @IsString()
        public  _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public school: string;

    @IsString()
        public qualification: string;

    @IsString()
        public level: string;

    @IsNumber()
        public year_of_passing: string;



}
export class UpdateEducationDto{

    @IsString()
        public  _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public school: string;

    @IsString()
        public qualification: string;

    @IsString()
        public level: string;

    @IsNumber()
        public year_of_passing: string;



}