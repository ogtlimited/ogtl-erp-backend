import {IsNotEmpty, IsString } from 'class-validator';

export class CreateGradeDto{
 
    
    @IsNotEmpty()
    @IsString()
      grade: string;


}

export class UpdateGradeDto{
  @IsString()
    public _id: string;
  
  @IsNotEmpty()
  @IsString()
    public grade: string;


}