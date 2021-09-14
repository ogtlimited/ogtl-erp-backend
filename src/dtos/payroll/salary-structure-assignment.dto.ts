/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString } from 'class-validator';

export class CreateSalaryStructureAssignmentDto {  
    @IsString()
    public ogid: string;
    @IsString()
    public salaryStructureId: String;
}
