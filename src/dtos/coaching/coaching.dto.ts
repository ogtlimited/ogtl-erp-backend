/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { IsString, IsDateString } from "class-validator";


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

    @IsString()
    public coaching_type: string;

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

    @IsString()
    public user_response: string;
}
