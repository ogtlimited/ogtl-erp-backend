import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUpdateSalaryDto {
  @IsOptional()
  @IsString()
  public _id: String;

  @IsOptional()
  @IsNumber()
  public basic: Number;

  @IsOptional()
  @IsNumber()
  public medical: Number;

  @IsOptional()
  @IsNumber()
  public housing: Number;

  @IsOptional()
  @IsNumber()
  public transport: Number;

  @IsOptional()
  @IsNumber()
  public otherAllowances: Number;

  @IsOptional()
  @IsNumber()
  public CRA: Number;

  @IsOptional()
  @IsNumber()
  public monthlyEmployeePension: Number;

  @IsOptional()
  @IsNumber()
  public CRABonusAmount: Number;

  @IsOptional()
  @IsBoolean()
  public active: Boolean;
}
