import {IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDesignationDto{
   @IsNotEmpty()
   @IsString()
   public designation: string;

   @IsOptional()
   @IsString()
   public department_id: string;

   @IsOptional()
   @IsString()
   public campaign_id: string;

   @IsOptional()
   @IsNumber()
   public approval_level: number;
}

export class UpdateDesignationDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
    public designation: string;

    @IsOptional()
    @IsString()
    public department_id: string;

    @IsOptional()
    @IsString()
    public campaign_id: string;

    @IsOptional()
    @IsNumber()
    public approval_level: number;
}
