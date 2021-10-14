/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

/*
    - deprtmentId: ref
    - projectId: ref
    - budget: number
    - available balance: number
    - start date: date
    - end date: date

*/
export class CreateBudgetDto {  

  @IsDateString()
  public startDate: string;

  @IsDateString()
  public endDate: string;

  @IsString()
  @IsOptional()
  public departmentId: string;

  @IsString()
  @IsOptional()
  public projectId: string;

  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsNumber()
  public budget: Number;

}

export class UpdateBudgetDto {  
    @IsDateString()
    @IsOptional()
    public startDate: string;
  
    @IsDateString()
    @IsOptional()
    public endDate: string;
  
    @IsString()
    @IsOptional()
    public departmentId: string;
  
    @IsString()
    @IsOptional()
    public projectId: string;

    @IsString()
    @IsOptional()
    public title: string;

    @IsString()
    @IsOptional()
    public description: string;
    
    @IsNumber()
    @IsOptional()
    public budget: Number;
    
}

export class IncreaseBudgetDto {  
    @IsNumber()
    public amount: Number;
}
