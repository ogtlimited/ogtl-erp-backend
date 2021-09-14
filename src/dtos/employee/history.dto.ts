import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateHistoryDto{


    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public branch_id: string;

    @IsString()
        public designation_id: string;

    @IsDateString()
        public from_date: Date;

    @IsDateString()
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

    @IsDateString()
        public from_date: Date;

    @IsDateString()
        public to_date: Date;

}
