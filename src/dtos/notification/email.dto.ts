/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsBoolean } from 'class-validator';

export class EmailDto {  
    
    @IsBoolean()
    public is_read: boolean;
  
}