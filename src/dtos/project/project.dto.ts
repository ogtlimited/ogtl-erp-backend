import { IsString,IsEnum ,IsOptional,IsNotEmpty} from 'class-validator';
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
  public hours_of_operation: string;

  @IsNotEmpty()
  @IsString()
  public type_of_employees: string;

  @IsNotEmpty()
  @IsString()
  public start_date: string;

  @IsNotEmpty()
  @IsString()
  public end_date: string;

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
    public hours_of_operation: string;
  
    @IsNotEmpty()
    @IsString()
    public type_of_employees: string;
  
    @IsNotEmpty()
    @IsString()
    public start_date: string;
  
    @IsNotEmpty()
    @IsString()
    public end_date: string;
  
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