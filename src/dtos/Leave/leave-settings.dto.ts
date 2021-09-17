/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLeaveSettingsDTO{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsNumber() 
    public unused_leaves : number;

    @IsNotEmpty()
    @IsNumber() 
    public carryover : number;

}
export class UpdateLeaveSettingsDTO{
    @IsString()
    public _id: string;

    @IsNotEmpty()
    @IsNumber() 
    public unused_leaves : number;

    @IsNotEmpty()
    @IsNumber() 
    public carryover : number;

}