/* eslint-disable prettier/prettier */
import {IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateExitDto{
    

    @IsNotEmpty()
    @IsString()    
        public employee_id: string;

    @IsDateString()
        public resignation_letter_date: Date;
    
    @IsDateString()
        public relieving_date: Date;

    @IsString()
        public reason_for_leaving: string;
    
    @IsString()
        public leave_encashed: string;
    
    @IsDateString()
        public encashment_date: Date;
    
    @IsString()
        public reason_for_resignation: string;

    @IsString()
        public new_work_place: string;
    
    @IsString()
        public feedback: string;
    
}
export class UpdateExitDto{
    @IsString()
        public _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsDateString()
        public resignation_letter_date: Date;
    
    @IsDateString()
        public relieving_date: Date;

    @IsString()
        public reason_for_leaving: string;
    
    @IsString()
        public leave_encashed: string;
    
    @IsDateString()
        public encashment_date: Date;
    
    @IsString()
        public reason_for_resignation: string;

    @IsString()
        public new_work_place: string;
    
    @IsString()    
        public feedback: string;
    
}