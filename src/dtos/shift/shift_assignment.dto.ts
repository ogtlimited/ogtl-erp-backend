/* eslint-disable prettier/prettier */
import { IsString, IsDate ,IsNotEmpty} from 'class-validator';

export class CreateShiftAssignmentDto {
  @IsNotEmpty()
  @IsString()
  public shift_type_id: string;

  @IsNotEmpty()
  @IsString()
  public employee_id: string;

  @IsDate()
  public assignment_date: Date;
}
