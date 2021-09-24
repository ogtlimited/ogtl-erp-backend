/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssetAssignmentDto{
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
    @IsString()
    public assigned_by: string;

    
    @IsNotEmpty()
    @IsString()
    public condition: string;

    @IsNotEmpty()
    @IsString()
    public warranty: string;

    @IsOptional()
    @IsString()
    public description: string;




}

export class UpdateAssetAssignmentDto{
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
    @IsString()
    public assigned_by: string;


    @IsNotEmpty()
    @IsString()
    public condition: string;

    @IsNotEmpty()
    @IsString()
    public warranty: string;


    @IsOptional()
    @IsString()
    public description: string;

}

