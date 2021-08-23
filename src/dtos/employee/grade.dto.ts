import {IsNotEmpty, IsString } from 'class-validator';

export class CreateGradeDto{
    @IsString()
      public _id: string;
    
    @IsNotEmpty()
    @IsString()
      grade: string;


}

export class UpdateGradeDto{
  @IsString()
    public _id: string;
  
  @IsNotEmpty()
  @IsString()
    grade: string;


}