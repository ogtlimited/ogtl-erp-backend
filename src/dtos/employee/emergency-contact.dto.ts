import {IsString,IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEmergencyContactDto{

@IsString()
    public _id: string;

@IsNotEmpty()
@IsString()
    public employee_id: string;

@IsNotEmpty()
@IsNumber()    
    public emergency_phone: string;

@IsNotEmpty()
@IsString()    
    public emergency_contact_name:string;
    
@IsString()    
    public relation: string;

}

export class UpdateEmergencyContactDto{

    @IsString()
        public _id: string;
    
    @IsNotEmpty()
    @IsString()
        public employee_id: string;
    
    @IsNotEmpty()
    @IsNumber()   
        public emergency_phone: string;
    
    @IsNotEmpty()
    @IsString()    
        public emergency_contact_name:string;
        
    @IsString()    
        public relation: string;
    
    }
