/* eslint-disable prettier/prettier */
import { IsString,IsEnum ,IsDateString,IsNotEmpty} from 'class-validator';
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
  public hours_of_operation: number;

  @IsNotEmpty()
  @IsString()
  public type_of_employees: string;

  @IsNotEmpty()

  @IsDateString()
  public start_date: Date;

  @IsDateString()
  public end_date: Date;

  @IsNotEmpty()
  @IsString()
  public number_of_employees: number;

  @IsNotEmpty()
  @IsString()
  public billing_structure: string;

  @IsNotEmpty()
  @IsString()
  public diallers: string;

  @IsString()
  public documents: string;

  @IsString()
  public creator: string;

  @IsString()
  public approved: string;

  @IsString()
  public manager: string;

  @IsString()
  public quality_analyst: string;
}

export class UpdateProjectDto {
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
    public hours_of_operation: number;

    @IsNotEmpty()
    @IsString()
    public type_of_employees: string;

    @IsNotEmpty()
    @IsDateString()
    public start_date: Date;

    @IsDateString()
    public end_date: Date;

    @IsNotEmpty()
    @IsString()
    public number_of_employees: number;

    @IsNotEmpty()
    @IsString()
    public billing_structure: string;

    @IsString()
    public diallers: string;

    @IsString()
    public documents: string;

    @IsString()
    public creator: string;

    @IsString()
    public manager: string;

    @IsString()
    public quality_analyst: string;
  }


  export class ApproveProjectDto {

    @IsString()
    public status: string;

  }
  