/* eslint-disable prettier/prettier */
export enum SalaryComponentType {
    Earning, 
    Deduction
  }

export interface SalaryComponent {
    salaryComponent: string,
    salaryComponentAbbr: string,
    description: string,
    isTaxApplicable: boolean,
    dependsOnPaymentDays: boolean,
    amount: Number,
    type: Array<SalaryComponentType>,
}
