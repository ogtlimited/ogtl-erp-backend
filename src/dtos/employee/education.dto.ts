import {IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto{



    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public school: string;

    @IsString()
        public qualification: string;

    @IsString()
        public level: string;

    @IsString()
        public year_of_passing: string;



}
export class UpdateEducationDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public school: string;

    @IsString()
        public qualification: string;

    @IsString()
        public level: string;

    @IsString()
        public year_of_passing: string;



}
