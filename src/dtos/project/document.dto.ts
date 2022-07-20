/* eslint-disable prettier/prettier */
import { IsString,IsNotEmpty, IsOptional} from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsString()
  public project_id: string;

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

  @IsNotEmpty()
  public document_type: string

  @IsNotEmpty()
  public parent_folder_id: string
}

export class UpdateDocumentDto {
    @IsNotEmpty()
    @IsString()
    public project_id: string;

    @IsNotEmpty()
    public document: any;
  }
