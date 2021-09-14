/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsEmail } from 'class-validator';

export class TrainingResultDto {  
    @IsString()
    public training_event_id: string;
}

export class PutTrainingResultDto {  
    @IsString()
    public training_event_id: string;
}