import {IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDesignationDto{
   @IsNotEmpty()
   @IsString()
   public designation: string;

   @IsNotEmpty()
   @IsString()
   public department_id: string;

   @IsOptional()
   @IsString()
   public project_id: string;
}

export class UpdateDesignationDto{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsString()
    public designation: string;

    @IsNotEmpty()
    @IsString()
    public department_id: string;

    @IsOptional()
    @IsString()
    public project_id: string;
}
