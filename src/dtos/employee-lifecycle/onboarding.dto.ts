/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsDate,  IsString } from 'class-validator';

export class CreateOnBoardingDto {
  
    @IsString()
    public jobApplicant: string;

    @IsString()
    public employee: string;

    @IsString()
    public status: string;

    @IsString()
    public employeeOnboardingTemplate: string;

    @IsString()
    public department: string;

    @IsString()
    public designation: string;

    @IsString()
    public employee_grade: string;

    @IsString()
    public campaign: string;

    @IsString()
    public branch: string; 
    
    @IsDate()
    public dateOfJoining: Date;
}
