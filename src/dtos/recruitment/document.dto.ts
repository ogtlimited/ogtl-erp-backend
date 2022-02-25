/* eslint-disable prettier/prettier */
import { IsString,IsNotEmpty, IsOptional} from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsString()
  public job_id: string;

  @IsOptional()
  public file_path: string

  @IsOptional()
  public file_name: string

  @IsOptional()
  public file_size: string

  @IsOptional()
  public file_type: string

  @IsOptional()
  public file_extension: string
}

export class UpdateDocumentDto {
    @IsNotEmpty()
    @IsString()
    public project_id: string;

    @IsNotEmpty()
    public document: any;
  }
  