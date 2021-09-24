/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePurchaseOrderDto{
    @IsNotEmpty()
    @IsString()
    public productName : string;

    @IsOptional()
    @IsString()
    public departmentId : string;

   
    @IsString()
    @IsOptional()
    public projectId : string;

    @IsNotEmpty()
    @IsString()
    public location : string;

    @IsNotEmpty()
    @IsString()
    public manufacturer : string;

    @IsNotEmpty()
    @IsString()
    public model : string;

    @IsNotEmpty()
    @IsString()
    public amount : string;




}
export class UpdatePurchaseOrderDto{
    @IsString()
    public _id : string;

    @IsOptional()
    @IsString()
    public productName : string;

    @IsOptional()
    @IsString()
    public departmentId : string;

    @IsOptional()
    @IsString()
    public projectId : string;

    @IsOptional()
    @IsString()
    public location : string;

    @IsOptional()
    @IsString()
    public manufacturer : string;

    @IsOptional()
    @IsString()
    public model : string;

    @IsOptional()
    @IsString()
    public amount : string;

    
    

    
}

export class UpdatePurchaseStatus {
    @IsString()
    public _id: string;
  
    @IsString()
    @IsNotEmpty()
    public status: string
  }
  