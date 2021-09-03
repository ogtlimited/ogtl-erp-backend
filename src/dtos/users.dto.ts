import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsNumber()
  public permissionLevel: number;
}
export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
