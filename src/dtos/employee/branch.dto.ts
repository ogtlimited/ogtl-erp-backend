import {IsNotEmpty, IsString } from 'class-validator';

export class CreateBranchDto{
    @IsNotEmpty()
    @IsString()
    public branch: string;

}

export class UpdateBranchDto{
    @IsNotEmpty()
    @IsString()
    public branch: string;

}

