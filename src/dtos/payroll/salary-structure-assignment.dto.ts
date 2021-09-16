/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsDateString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateSalaryStructureAssignmentDto {

    @IsArray()
    @IsNotEmpty()
    @IsString({each:true})
    public employeeIds?: Array<String>;

    @IsString()
    @IsNotEmpty()
    public salaryStructureId: String;

    @IsDateString()
    fromDate: string

}
