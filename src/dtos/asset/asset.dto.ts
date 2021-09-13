/* eslint-disable prettier/prettier */
import {IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto{
    @IsNotEmpty()
    @IsString()
    public assetName: string;


    @IsNotEmpty()
    @IsString()
    public assigned_to: string;

    @IsNotEmpty()
    @IsDateString()
    public purchaseDate: string;

    @IsNotEmpty()
    @IsString()
    public manufacturer: string;


    @IsNotEmpty()
    @IsString()
    public model: string;


    @IsNotEmpty()
    @IsString()
    public serialNumber: string;

    @IsNotEmpty()
    @IsString()
    public supplier: string;

    @IsNotEmpty()
    @IsString()
    public condition: string;

    @IsNotEmpty()
    @IsString()
    public warranty: string;

    @IsNotEmpty()
    @IsString()
    public value: string;


    @IsString()
    public description: string;




}

export class UpdateAssetDto{
    @IsString()
    public _id : string;

    @IsNotEmpty()
    @IsString()
    public assetId: string;

    @IsNotEmpty()
    @IsString()
    public assetName: string;


    @IsNotEmpty()
    @IsString()
    public assigned_to: string;

    @IsNotEmpty()
    @IsDateString()
    public purchaseDate: string;

    @IsNotEmpty()
    @IsString()
    public manufacturer: string;


    @IsNotEmpty()
    @IsString()
    public model: string;


    @IsNotEmpty()
    @IsString()
    public serialNumber: string;

    @IsNotEmpty()
    @IsString()
    public supplier: string;

    @IsNotEmpty()
    @IsString()
    public condition: string;

    @IsNotEmpty()
    @IsString()
    public warranty: string;

    @IsNotEmpty()
    @IsString()
    public value: string;


    @IsString()
    public description: string;

}

