/* eslint-disable prettier/prettier */
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonalDetailsDto{
    @IsOptional()
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public means_of_identification: string;
    @IsString()
        public id_number: string;

    @IsDateString()
        public date_of_issue: Date;

    @IsDateString()
        public valid_upto:  Date;

    @IsString()
        public place_of_issue: string;

    @IsString()
        public marital_status: string;

    @IsString()
        public blood_group: string;

  @IsDateString()
  public date_of_birth: Date;
}

export class UpdatePersonalDetailsDto{
    @IsString()
        public  _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
    public means_of_identification: string;

    @IsString()
    public id_number: string;

    @IsDateString()
        public date_of_issue: Date;

    @IsDateString()
        public valid_upto:  Date;

    @IsString()
        public place_of_issue: string;

    @IsString()
        public marital_status: string;

    @IsString()
        public blood_group: string;

  @IsDateString()
  public date_of_birth: Date;
}





