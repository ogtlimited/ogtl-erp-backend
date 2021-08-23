import {IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateHistoryDto{
    @IsString()
        public _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public branch_id: string;

    @IsString()
        public designation_id: string;

    @IsDate()
        public from_date: Date;

    @IsDate()
        public to_date: Date;

}
export class UpdateHistoryDto{
    @IsString()
        public _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public branch_id: string;

    @IsString()
        public designation_id: string;

    @IsDate()
        public from_date: Date;

    @IsDate()
        public to_date: Date;

}