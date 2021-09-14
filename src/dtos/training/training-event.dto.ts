/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsEmail } from 'class-validator';

export class TrainingEventDto {  
    @IsString()
    public event_name: string;

    @IsString()
    public event_type: string;

    @IsString()
    public training_program_id: string;

    @IsString()
    public level: string;

    @IsString()
    public event_status: string;

    @IsEmail()
    public trainer_name: string;

    @IsEmail()
    public trainer_email: string;

    @IsString()
    public description: string;

    @IsString()
    public has_certificate: Boolean;

    @IsString()
    public course: string;

    @IsString()
    public start_time: Date;

    @IsString()
    public end_time: Date;

    @IsString()
    public location: Date;

    @IsString()
    public introduction: Date;
}

export class PutTrainingEventDto {  
    @IsString()
    public event_name: string;

    @IsString()
    public event_type: string;

    @IsString()
    public training_program_id: string;

    @IsString()
    public level: string;

    @IsString()
    public event_status: string;

    @IsEmail()
    public trainer_name: string;

    @IsEmail()
    public trainer_email: string;

    @IsString()
    public description: string;

    @IsString()
    public has_certificate: Boolean;

    @IsString()
    public course: string;

    @IsString()
    public start_time: Date;

    @IsString()
    public end_time: Date;

    @IsString()
    public location: Date;

    @IsString()
    public introduction: Date;
}