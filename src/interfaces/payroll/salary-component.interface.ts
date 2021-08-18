/* eslint-disable prettier/prettier */
export enum SalaryComponentType {
    Earning, 
    Deduction
  }

export interface SalaryComponent {
    salaryComponent: string;
    status: string;
    salaryComponentAbbr: string;
    description: string;
    isTaxApplicable: boolean;
    dependsOnPaymentDays: boolean;
    amount: Number;
    type: Array<string>;
}
