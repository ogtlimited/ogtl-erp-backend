/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsBoolean, IsArray } from 'class-validator';

export class NotificationDto {  
    
    @IsString()
    public document_name: string;

    @IsString()
    public subject: string;

    @IsString()
    public send_alert_on: string;

    @IsString()
    public sender: string;

    @IsBoolean()
    public disabled: boolean;

    @IsArray()
    public receiver_role: string;

    @IsString()
    public message: string;
  
}

export class PutNotificationDto {

    @IsString()
    public document_name: string;

    @IsString()
    public subject: string;

    @IsString()
    public send_alert_on: string;

    @IsString()
    public sender: string;

    @IsBoolean()
    public disabled: boolean;

    @IsArray()
    public receiver_role: string;

    @IsString()
    public message: string;

}