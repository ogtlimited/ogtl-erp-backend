import {IsString,IsBoolean} from 'class-validator';

export class CreateRolePermissionDto {
  @IsString()
  public role:string;

  @IsBoolean()
  public create:boolean;

  @IsBoolean()
  public read:boolean;

   @IsBoolean()
  public update:boolean;

   @IsBoolean()
  public delete:boolean;
}

export class UpdateRolePermissionDto {
  @IsString()
  public _id:string;

  @IsString()
  public role:string;

  @IsBoolean()
  public create:boolean;

  @IsBoolean()
  public read:boolean;

  @IsBoolean()
  public update:boolean;

  @IsBoolean()
  public delete:boolean;
}
