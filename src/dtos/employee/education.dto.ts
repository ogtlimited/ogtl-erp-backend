import {IsDate, IsString } from 'class-validator';

export class CreateEducationDto{

    @IsString()
        public  _id: string;

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