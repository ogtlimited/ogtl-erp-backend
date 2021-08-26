import {IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePersonalDetailsDto{
    
        
    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsNumber()
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

export class UpdatePersonalDetailsDto{
    @IsString()
        public  _id: string;
    
    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsNumber()
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





