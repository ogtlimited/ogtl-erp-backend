/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { IsString, IsDateString, IsOptional } from 'class-validator';


export class CoachingFormDTO {

    @IsString()
    public coaching_type: string;

    @IsString()
    public employee_id: string;

    @IsString()
    public goals: string;

    @IsDateString()
    public incident_date: string;

    @IsString()
    public opportunities: string;

    @IsString()
    public reality: string;

    @IsString()
    public supervisor: string;

    @IsString()
    public way_forward: string;

    @IsString()
    public status: string;
}

export class CoachingFormUpdateDTO {

  @IsOptional()
  @IsString()
  public _id: string;

    @IsOptional()
    @IsString()
    public coaching_type: string;

  @IsOptional()
    @IsString()
    public goals: string;

  @IsOptional()
    @IsDateString()
    public incident_date: string;

  @IsOptional()
    @IsString()
    public opportunities: string;

  @IsOptional()
    @IsString()
    public reality: string;

  @IsOptional()
    @IsString()
    public supervisor: string;

  @IsOptional()
    @IsString()
    public way_forward: string;

  @IsOptional()
    @IsString()
    public status: string;

  @IsOptional()
    @IsString()
    public user_response: string;
}
export class CoachingFormUserResponseUpdateDTO {

    @IsString()
    public user_response: string;

    @IsString()
    public reason: string;
}
