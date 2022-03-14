/* eslint-disable prettier/prettier */
import {IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateExitDto{
    

    @IsNotEmpty()
    @IsString()    
        public employee_id: string;

    @IsNotEmpty()
    @IsDateString()
        public resignation_letter_date: Date;
    
    @IsNotEmpty()
    @IsDateString()
        public relieving_date: Date;

    
    @IsString()
        public reason_for_resignation: string;

   
    
}
export class UpdateExitDto{
    @IsString()
        public _id: string;

        @IsNotEmpty()
        @IsString()    
            public employee_id: string;
    
        @IsNotEmpty()
        @IsDateString()
            public resignation_letter_date: Date;
        
        @IsNotEmpty()
        @IsDateString()
            public relieving_date: Date;
    
        
        @IsString()
            public reason_for_resignation: string;
    
}
