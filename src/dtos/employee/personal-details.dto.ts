import {IsDate, IsString } from 'class-validator';

export class CreatePersonalDetailsDto{
    @IsString()
        public  _id: string;

    @IsString()
        public employee_id: string;

    @IsString()
        public passport_number: string;

    @IsDate()
        public date_of_issue: Date;

    @IsDate()
        public valid_upto:  Date;
        
    @IsString()
        public place_of_issue: string;

    @IsString()
        public marital_status: string;

    @IsString()
        public blood_group: string;
}





