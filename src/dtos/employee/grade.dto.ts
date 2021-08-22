import {IsString } from 'class-validator';

export class CreateGradeDto{
    @IsString()
      public _id: string;
    
    @IsString()
      grade: string;


}