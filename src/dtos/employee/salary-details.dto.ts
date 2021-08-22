import {IsDate, IsString } from 'class-validator';

export class CreateSalaryDetailsDto{
     @IsString()
        public _id: string;
     
    @IsString()
        public employee_id: string;

    @IsString()
        public salary_mode: string;
    
    @IsString()
        public bank_name: string;
    
    @IsString()
       public bank_code: string;
    
    @IsString()
        public bank_account_number: string;


}