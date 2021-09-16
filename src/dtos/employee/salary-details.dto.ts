import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSalaryDetailsDto{
  @IsOptional()
  @IsString()
  public _id: string;

    @IsNotEmpty()
    @IsString()
        public employee_id: string;

    @IsString()
        public salary_mode: string;

    @IsString()
        public bank_name: string;

    @IsString()
       public bank_code: string;

    @IsString()
        public bank_account_number: string;


}

export class UpdateSalaryDetailsDto{
    @IsString()
       public _id: string;

   @IsNotEmpty()
   @IsString()
       public employee_id: string;

   @IsString()
       public salary_mode: string;

   @IsString()
       public bank_name: string;

   @IsString()
      public bank_code: string;

    @IsString()
       public bank_account_number: string;


}
