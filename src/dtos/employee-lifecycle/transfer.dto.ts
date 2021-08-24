/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsDate,  IsString } from 'class-validator';

export class CreateTransferDto {

    @IsString()
    public employeeId: string;
    
    @IsString()
    public status: string;
    
    @IsString()
    public branch: string;  
    
    @IsString()
    public department: string;
    
    @IsString()
    public transferDetails: string;
    
    @IsDate()
    public transferDate: Date;
}
