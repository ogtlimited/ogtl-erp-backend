import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContactDetailsDto{
  
    
        
    
    @IsNotEmpty()
    @IsString()
        public employee_id: string;
    
    @IsNotEmpty()
    @IsNumber()
        public mobile: string;
    
    @IsNotEmpty()
    @IsString()
        public personal_email: string;

    @IsString()
        public parmanent_addresss_is: string;

    @IsString()
        public parmanent_addresss:string;
    
    @IsString()
        public current_address_is: string;
    
    @IsString()
        public current_address: string;
     
    



}
export class UpdateContactDetailsDto{
    @IsString()
    public _id: string;
        

    @IsString()
        public employee_id: string;

    @IsString()
        public mobile: string;

    @IsString()
        public personal_email: string;

    @IsString()
        public parmanent_addresss_is: string;

    @IsString()
        public parmanent_addresss:string;
    
    @IsString()
        public current_address_is: string;
    
    @IsString()
        public current_address: string;
     
   
}