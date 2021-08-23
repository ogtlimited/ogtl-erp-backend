import {IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateExitDto{
    @IsString()
        public _id: string;

    @IsNotEmpty()
    @IsString()    
        public employee_id: string;

    @IsDate()
        public resignation_letter_date: Date;
    
    @IsDate()
        public relieving_date: Date;

    @IsString()
        public reason_for_leaving: string;
    
    @IsString()
        public leave_encashed: string;
    
    @IsDate()
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

    @IsDate()
        public resignation_letter_date: Date;
    
    @IsDate()
        public relieving_date: Date;

    @IsString()
        public reason_for_leaving: string;
    
    @IsString()
        public leave_encashed: string;
    
    @IsDate()
        public encashment_date: Date;
    
    @IsString()
        public reason_for_resignation: string;

    @IsString()
        public new_work_place: string;
    
    @IsString()    
        public feedback: string;
    
}