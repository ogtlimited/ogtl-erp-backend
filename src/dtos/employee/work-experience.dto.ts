import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWorkExperienceDto{
    @IsString()
        public  _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public company: string;

    @IsString()
        public designation: string;

    @IsNumber()
        public salary: string;

    @IsString()
        public address: string;

}

export class UpdateWorkExperienceDto{
    @IsString()
        public  _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public company: string;

    @IsString()
        public designation: string;

    @IsNumber()
        public salary: string;

    @IsString()
        public address: string;

}