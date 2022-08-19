/* eslint-disable prettier/prettier */
import { IsString ,IsNotEmpty} from 'class-validator';

export class CreateTicketingDto {

  @IsNotEmpty()
  @IsString()
  public employee_id: string;

 @IsNotEmpty()
  @IsString()
  public department: string;

@IsNotEmpty()
  @IsString()
  public title: string;

@IsNotEmpty()
  @IsString()
  public content: string;

}

export class UpdateTicketingDto {
  @IsString()
  public _id: string;


  @IsString()
  public employee_id: string;


  @IsString()
  public department: string;


  @IsString()
  public title: string;


  @IsString()
  public content: string;


  @IsString()
  public status: string;



}
