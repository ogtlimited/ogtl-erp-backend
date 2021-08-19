/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsDate,  IsString } from 'class-validator';

export class CreatePromotionDto {
  
    @IsString()
    public employee: string;

    @IsString()
    public status: string;

    @IsString()
    public department: string;

    @IsString()
    public branch: string;
    
    @IsString()
    public promotionDetails: string;

    @IsDate()
    public promotionDate: Date;

}
