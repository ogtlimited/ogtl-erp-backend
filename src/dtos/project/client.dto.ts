/* eslint-disable prettier/prettier */
import { IsString,IsEnum ,IsOptional,IsNotEmpty} from 'class-validator';
import { IClient } from '@interfaces/project-interface/client.interface';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  public client_name: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public address: string;

  @IsString()
  public contact_phone: string;

  @IsNotEmpty()
  @IsString()
  public city: string;

  @IsNotEmpty()
  @IsString()
  public code : string;


  @IsNotEmpty()
  @IsString()
  public state : string;

  @IsNotEmpty()
  @IsString()
  public country : string;
  
  @IsNotEmpty()
  @IsString()
  public company : string;



}

export class UpdateClientDto {
    @IsNotEmpty()
  @IsString()
  public client_name: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public address: string;

  @IsString()
  public contact_phone: string;

  @IsNotEmpty()
  @IsString()
  public city: string;

  @IsNotEmpty()
  @IsString()
  public code: string;


  @IsNotEmpty()
  @IsString()
  public state: string;

  @IsNotEmpty()
  @IsString()
  public country : string;
  
  @IsNotEmpty()
  @IsString()
  public company : string;

}