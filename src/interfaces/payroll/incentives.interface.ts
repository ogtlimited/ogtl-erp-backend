/* eslint-disable prettier/prettier */
export interface IIncentives {
  employee: string;
  salaryComponent: string;
  additionalSalary: string;
  status:string
  incentiveAmount: Number;
  payrollDate: Date;
}


export interface IIncentiveCreatedResponse {
  ogId: string;
  salaryComponent: string;
  additionalSalary: string;
  status:string
  incentiveAmount: Number;
  payrollDate: Date;
}
