import {IsString } from 'class-validator';

export class CreateBranchDto{

    @IsString()
    public branch: string;

}