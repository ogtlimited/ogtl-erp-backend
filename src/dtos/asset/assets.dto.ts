/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto{ 

    

    @IsNotEmpty()
    @IsString()
    public assetName: string;

    @IsOptional()
    @IsString()
    public serialNumber : string;

    @IsNotEmpty()
    @IsString()
    public assetType : string;

}

export class UpdateAssetDto{
    @IsString()
    public _id : string;

    @IsOptional()
    @IsString()
    public assetId: string;

    @IsOptional()
    @IsString()
    public assetName: string;

    @IsOptional()
    @IsString()
    public serialNumber : string;

    @IsOptional()
    @IsString()
    public assetType : string;


 }

    