/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class RoleDto { 
    @IsString() 
    public title: string;

    @IsString()
    public description: string;
}

export class UpdateRoleDto { 
    @IsString() 
    public title: string;

    @IsString()
    public description: string;

}