/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  @IsString()
  public branch: string;
}

export class UpdateBranchDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public branch: string;
}
