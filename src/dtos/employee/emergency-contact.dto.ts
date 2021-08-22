import {IsString } from 'class-validator';

export class CreateEmergencyContactDto{

@IsString()
    public _id: string;

@IsString()
    public employee_id: string;

@IsString()    
    public emergency_phone: string;

@IsString()    
    public emergency_contact_name:string;
    
@IsString()    
    public relation: string;

}
