/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString } from 'class-validator';

export class CreatePurchaseOrderDto{
    @IsNotEmpty()
    @IsString()
    public productName : string;

    @IsNotEmpty()
    @IsString()
    public departmentId : string;

    @IsNotEmpty()
    @IsString()
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

    @IsNotEmpty()
    @IsString()
    public purchaseOrderId : string;

    @IsNotEmpty()
    @IsString()
    public status : string;

}
export class UpdatePurchaseOrderDto{
    @IsString()
    public _id : string;

    @IsNotEmpty()
    @IsString()
    public productName : string;

    @IsNotEmpty()
    @IsString()
    public departmentId : string;

    @IsNotEmpty()
    @IsString()
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

    @IsNotEmpty()
    @IsString()
    public purchaseOrderId : string;
    
    @IsNotEmpty()
    @IsString()
    public status : string;
    
}