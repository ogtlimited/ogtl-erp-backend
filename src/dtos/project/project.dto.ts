/* eslint-disable prettier/prettier */
import { IsString, IsEnum, IsDateString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';
import { IProject } from '@interfaces/project-interface/project.interface';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  public project_name: string;

  @IsNotEmpty()
  @IsString()
  public client_id: string;

  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsString()
  public objectives: string;

  @IsString()
  public shift_start: string;

  @IsString()
  public shift_end: string;

  @IsNotEmpty()
  @IsDateString()
  public start_date: Date;

  @IsDateString()
  public end_date: Date;

  @IsNotEmpty()
  @IsString()
  public number_of_employees: string;

  @IsNotEmpty()
  @IsString()
  public billing_structure: string;

  @IsNotEmpty()
  @IsString()
  public diallers: string;

  @IsString()
  public creator: string;
  //
  // @IsString()
  // public status: string;

  @IsString()
  public manager: string;

  @IsString()
  public quality_analyst: string;
}

export class UpdateProjectDto {
  @IsOptional()
  public _id: string;

    @IsOptional()
    public project_name: string;

    @IsOptional()
    @IsString()
    public client_id: string;

    @IsOptional()
    @IsString()
    public type: string;

    @IsOptional()
    @IsString()
    public objectives: string;

    @IsOptional()
    @IsString()
    public hours_of_operation: string;

    @IsOptional()
    @IsDateString()
    public start_date: Date;

    @IsOptional()
    @IsDateString()
    public end_date: Date;

    @IsOptional()
    @IsString()
    public number_of_employees: string;

    @IsOptional()
    @IsString()
    public billing_structure: string;

    @IsOptional()
    @IsString()
    public diallers: string;

    @IsOptional()
    @IsString()
    public creator: string;

    @IsOptional()
    @IsString()
    public manager: string;

    @IsOptional()
    @IsString()
    public quality_analyst: string;
  }


  export class ApproveProjectDto {

    @IsString()
    public status: string;

  }

  export class UpdateTeamLeadDto {

    @IsNotEmpty()
    @IsArray()
    public team_leads: string;
  }

  export class UpdateTeamMembersDto {

    @IsNotEmpty()
    @IsArray()
    public team_members: string;
  }
