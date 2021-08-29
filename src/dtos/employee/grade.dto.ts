import {IsNotEmpty, IsString } from 'class-validator';

export class CreateGradeDto{
    // @IsString()
    //   public _id: string;
    //
    @IsNotEmpty()
    @IsString()
     public grade: string;


}

export class UpdateGradeDto{
  @IsString()
    public _id: string;

  @IsNotEmpty()
  @IsString()
   public grade: string;


}
