import {IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSalaryDetailsDto{
     @IsString()
        public _id: string;
    
    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public salary_mode: string;
    
    @IsString()
        public bank_name: string;
    
    @IsString()
       public bank_code: string;
    
    @IsNumber()
        public bank_account_number: string;


}

export class UpdateSalaryDetailsDto{
    @IsString()
       public _id: string;
    
   @IsNotEmpty()
   @IsString()
       public employee_id: string;

   @IsString()
       public salary_mode: string;
   
   @IsString()
       public bank_name: string;
   
   @IsString()
      public bank_code: string;
   
    @IsNumber()
       public bank_account_number: string;


}