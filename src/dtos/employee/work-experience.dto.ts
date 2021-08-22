import { IsString } from 'class-validator';

export class CreateWorkExperienceDto{
    @IsString()
        public  _id: string;

    @IsString()
        public employee_id: string;

    @IsString()
        public company: string;

    @IsString()
        public designation: string;

    @IsString()
        public salary: string;

    @IsString()
        public address: string;

}