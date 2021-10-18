/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProcurementDto {  

  @IsString()
  public productName: string;

  @IsNumber()
  public productQuantity: Number;

  @IsNumber()
  public unitCost: Number;

  // @IsString()
  // @IsOptional()
  // public projectId: string;

  // @IsString()
  // @IsOptional()
  // public departmentId: string;

}

export class UpdateProcurementDto {  
    @IsString()
    @IsOptional()
    public productName: string;
  
    @IsNumber()
    @IsOptional()
    public productQuantity: Number;
  
    @IsNumber()
    @IsOptional()
    public unitCost: Number;
  
    @IsString()
    @IsOptional()
    public projectId: string;
  
    @IsString()
    @IsOptional()
    public departmentId: string;
    
}


