/* eslint-disable prettier/prettier */
import { IsString, IsDateString ,IsNotEmpty} from 'class-validator';

export class CreateShiftAssignmentDto {
  @IsNotEmpty()
  @IsString()
  public shift_type_id: string;

  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsDateString()
  public assignment_date: Date;
}

export class UpdateShiftAssignmentDto {
  @IsString()
  public _id: string;

  @IsNotEmpty()
  @IsString()
  public shift_type_id: string;

  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsDateString()
  public assignment_date: Date;
}
