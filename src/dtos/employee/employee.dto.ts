import { IsEmail, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
