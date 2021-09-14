/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsEmail } from 'class-validator';

export class TrainingAttendanceDto {  
    @IsString()
    public employee_id: string;

    @IsString()
    public training_event_id: string;

    @IsString()
    public feedback: string;
}

export class PutTrainingAttendanceDto {  
    @IsString()
    public employee_id: string;

    @IsString()
    public training_event_id: string;

    @IsString()
    public feedback: string;
}