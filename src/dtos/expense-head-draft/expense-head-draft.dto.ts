/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import {IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseHeadDraftDto {
  @IsString()
  public title: string;

  @IsNumber()
  public flagAlert: Number;

  @IsString()
  @IsOptional()
  public departmentId: string;

  @IsString()
  @IsOptional()
  public projectId: string;

}

export class UpdateExpenseHeadDraftDto {
  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @IsOptional()
  public departmentId: string;

  @IsString()
  @IsOptional()
  public projectId: string;

  @IsNumber()
  @IsOptional()
  public flagAlert: Number;

}

